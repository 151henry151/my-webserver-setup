"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const open_1 = __importDefault(require("open"));
const express_1 = __importDefault(require("express"));
const core_1 = require("@oclif/core");
const create_serverless_util_1 = require("../utils/create-serverless-util");
const helpers_1 = require("../utils/helpers");
const phone_number_utils_1 = require("../utils/phone-number-utils");
const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const { TwilioCliError } = require('@twilio/cli-core').services.error;
const WebClientPath = path_1.default.resolve(require.resolve('@twilio-labs/dev-phone-ui'), '..');
const { version } = require('../../package.json');
const AccessToken = require('twilio').jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;
const VoiceGrant = AccessToken.VoiceGrant;
const SyncGrant = AccessToken.SyncGrant;
const CALL_LOG_MAP_NAME = 'CallLog';
// removes unecessary properties to standardize the twilio phone number
const reformatTwilioPns = (twilioResponse) => {
    return {
        "phone-numbers": twilioResponse.map(({ phoneNumber, friendlyName, smsUrl, voiceUrl, sid }) => ({ phoneNumber, friendlyName, smsUrl, voiceUrl, sid }))
    };
};
const generateRandomPhoneName = () => {
    let rand = Math.random().toString().substring(2, 6);
    return `dev-phone-${rand}`;
};
class DevPhoneServer extends TwilioClientCommand {
    constructor(argv, config, secureStorage) {
        super(argv, config, secureStorage);
        this.cliSettings = {};
        this.pns = [];
        this.port = 1337;
        this.jwt = null;
        this.apikey = {};
        this.twimlApp = {};
        this.devPhoneName = generateRandomPhoneName();
        this.voiceUrl = null;
        this.smsUrl = null;
        this.voiceOutboundUrl = null;
    }
    run() {
        const _super = Object.create(null, {
            run: { get: () => super.run }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.run.call(this);
            const props = this.parseProperties() || {};
            yield this.validatePropsAndFlags(props, this.flags);
            console.log(`Hello 👋 I'm your dev-phone and my name is ${this.devPhoneName}\n`);
            // set user agent header on twilio client
            this.twilioClient.userAgentExtensions = [
                `@twilio-labs/dev-phone/${version}`,
                `@twilio-labs/dev-phone/helper-library`,
                'serverless-functions'
            ];
            // create API KEY and API SECRET to be generate JWT AccessToken for ChatGrant, VoiceGrant and SyncGrant
            this.apikey = yield this.reuseOrCreateApiKey();
            // create conversation for SMS/web interface
            this.conversation = yield this.createConversation();
            // create Sync for Call History interface
            this.sync = yield this.createSync();
            // create Function to handle inbound-voice, inbound-sms and outbound-voice (voip)
            this.serverless = yield this.createFunction();
            // create TwiML App
            this.twimlApp = yield this.createTwimlApp();
            // create JWT Access Token with ChatGrant, VoiceGrant and SyncGrant
            this.jwt = yield this.createJwt();
            // add webhook config to the phone number, if there is one passed by CLI flag
            // TO-DO return updated phone number and set this.phoneNumber  
            const phoneNumberProps = { voiceUrl: this.voiceUrl, smsUrl: this.smsUrl, statusCallback: this.statusCallback };
            this.cliSettings.phoneNumber = yield (0, phone_number_utils_1.updatePhoneWebhooks)(this.cliSettings.phoneNumber, this.twilioClient.incomingPhoneNumbers, phoneNumberProps);
            const onShutdown = () => __awaiter(this, void 0, void 0, function* () {
                yield this.destroyConversations();
                yield this.destroyTwimlApps();
                yield this.destroyApiKeys();
                yield this.destroySyncs();
                yield this.destroyFunction();
                yield (0, phone_number_utils_1.removePhoneWebhooks)(this.cliSettings.phoneNumber, this.twilioClient.incomingPhoneNumbers);
            });
            process.on('SIGINT', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    console.log("\n👋 Shutting down");
                    yield onShutdown();
                    process.exit();
                });
            });
            const app = (0, express_1.default)();
            // serve assets from the "public" directory
            // __dirname is the path to _this_ file, so ../../public to find index.html
            app.use(express_1.default.static(WebClientPath));
            app.use(express_1.default.json()); // response body writer
            app.get("/ping", (req, res) => {
                res.json({ pong: true });
                console.log('TWILIO', this.twilioClient);
            });
            app.get("/plugin-settings", (req, res) => {
                res.json(Object.assign(Object.assign({}, this.cliSettings), { devPhoneName: this.devPhoneName, conversation: this.conversation }));
            });
            app.get("/phone-numbers", (req, res) => __awaiter(this, void 0, void 0, function* () {
                if (this.pns.length === 0) {
                    try {
                        const pns = yield this.twilioClient.incomingPhoneNumbers.list();
                        this.pns = pns;
                        res.json(reformatTwilioPns(pns));
                    }
                    catch (err) {
                        console.error('Phone number API threw an error', err);
                        res.status(err.status ? err.status : 400).send({ error: err });
                    }
                }
                else {
                    res.json(reformatTwilioPns(this.pns));
                }
            }));
            app.post("/send-sms", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const { body, from, to } = req.body;
                try {
                    const message = yield this.twilioClient.messages
                        .create({
                        body,
                        from,
                        to
                    });
                    res.json({ result: message });
                }
                catch (err) {
                    console.error('SMS API threw an error', err);
                    res.status(err.status ? err.status : 400).send({ error: err });
                }
                ;
            }));
            app.all("/choose-phone-number", (req, res) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const rawNumbers = yield this.twilioClient.incomingPhoneNumbers
                        .list({ phoneNumber: req.body.phoneNumber, limit: 20 });
                    const selectedNumber = reformatTwilioPns(rawNumbers)["phone-numbers"];
                    // Should only have a single number
                    if (selectedNumber.length === 1) {
                        yield (0, phone_number_utils_1.removePhoneWebhooks)(this.cliSettings.phoneNumber, this.twilioClient.incomingPhoneNumbers);
                        this.cliSettings.phoneNumber = selectedNumber[0];
                        this.cliSettings.phoneNumber = yield (0, phone_number_utils_1.updatePhoneWebhooks)(this.cliSettings.phoneNumber, this.twilioClient.incomingPhoneNumbers, { voiceUrl: this.voiceUrl, smsUrl: this.smsUrl, statusCallback: this.statusCallback });
                        res.json({
                            phoneNumber: this.cliSettings.phoneNumber,
                            message: 'Phone number updated!'
                        });
                    }
                    else {
                        console.error('Phone number not found!');
                        res.status(400).send({
                            message: 'Phone number not found!'
                        });
                    }
                }
                catch (err) {
                    console.error(err);
                    res.status(400).send(err);
                }
            }));
            app.get("/client-token", (req, res) => __awaiter(this, void 0, void 0, function* () {
                try {
                    if (!this.jwt) {
                        this.jwt = yield this.createJwt();
                    }
                    res.json({ token: this.jwt });
                }
                catch (err) {
                    res.status(400).send(err);
                }
            }));
            const isHeadless = () => !!this.flags.headless;
            app.listen(this.port, () => {
                console.log(`🚀 Your local webserver is listening on port ${this.port}`);
                if (fs_1.default.existsSync(path_1.default.join(WebClientPath, 'index.html'))) {
                    const uiUrl = `http://localhost:${this.port}/`;
                    if (isHeadless()) {
                        console.log(`🌐 UI is available at ${uiUrl}`);
                    }
                    else {
                        console.log(`🌐 Opening ${uiUrl} your browser`);
                        (0, open_1.default)(uiUrl);
                    }
                }
                else {
                    console.log('Hello friend! Front end files are missing, ie you are developing this pluign.');
                    console.log('Run: `cd plugin-dev-phone-client` then `npm start` to run dev front-end');
                    console.log('To build the front-end so that the local backend will serve it: ./build-for-release.sh');
                }
                console.log('▶️  Use ctrl-c to stop your dev-phone\n');
            });
        });
    }
    createFunction() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('💻 Deploying a Functions Service to handle incoming calls and SMS...');
            const deployedFunctions = yield (0, create_serverless_util_1.deployServerless)({
                username: this.twilioClient.username,
                password: this.twilioClient.password,
                env: {
                    SYNC_SERVICE_SID: this.sync.sid,
                    CONVERSATION_SID: this.conversation.sid,
                    CONVERSATION_SERVICE_SID: this.conversation.serviceSid,
                    DEV_PHONE_NAME: this.devPhoneName,
                    DEV_PHONE_VERSION: version,
                    CALL_LOG_MAP_NAME
                },
                onUpdate: (event) => {
                    const isBuildStatusPing = event.message.indexOf('Current status: building') > -1;
                    const settingEnvVars = event.message.indexOf('environment variables') > -1;
                    if (isBuildStatusPing || event.status === 'building') {
                        isBuildStatusPing ? process.stdout.write('.') : process.stdout.write(`🛠 ${event.message}`);
                    }
                    else {
                        console.log(`${settingEnvVars ? '\n' : ''}🧑‍💻 ${event.message}`);
                    }
                }
            });
            console.log(`✅ I'm using the Serverless Service ${deployedFunctions.serviceSid}\n`);
            this.voiceUrl = `https://${deployedFunctions.domain}/${create_serverless_util_1.constants.INCOMING_CALL_HANDLER}`;
            this.voiceOutboundUrl = `https://${deployedFunctions.domain}/${create_serverless_util_1.constants.OUTBOUND_CALL_HANDLER}`;
            this.smsUrl = `https://${deployedFunctions.domain}/${create_serverless_util_1.constants.INCOMING_MESSAGE_HANDLER}`;
            this.statusCallback = `https://${deployedFunctions.domain}/${create_serverless_util_1.constants.SYNC_CALL_HISTORY}`;
            return deployedFunctions;
        });
    }
    destroyFunction() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const functionServices = yield this.twilioClient.serverless.services.list();
                const devPhoneFunctionServices = functionServices.filter((functionServices) => {
                    return functionServices.friendlyName !== null && functionServices.friendlyName.startsWith('dev-phone');
                });
                if (devPhoneFunctionServices.length > 0) {
                    console.log('🚮 Removing existing dev phone Serverless Functions');
                    devPhoneFunctionServices.forEach((functionService) => __awaiter(this, void 0, void 0, function* () {
                        yield this.twilioClient.serverless.services(functionService.sid)
                            .remove();
                    }));
                }
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    validatePropsAndFlags(props, flags) {
        return __awaiter(this, void 0, void 0, function* () {
            // Flags defined below can be validated and used here. Example:
            // https://github.com/twilio/plugin-debugger/blob/main/src/commands/debugger/logs/list.js#L46-L56
            this.cliSettings.forceMode = flags['force'];
            this.port = process.env.TWILIO_DEV_PHONE_PORT || (yield (0, helpers_1.getAvailablePort)());
            if (flags['phone-number']) {
                const phoneNumber = yield flags['phone-number'];
                this.pns = yield this.twilioClient.incomingPhoneNumbers
                    .list({ phoneNumber: phoneNumber });
                if (this.pns.length < 1) {
                    throw new TwilioCliError(`The phone number ${phoneNumber} is not associated with your Twilio account`);
                }
                const pnConfigAlreadySet = [
                    ((0, phone_number_utils_1.isSmsUrlSet)(this.pns[0].smsUrl) ? "SMS webhook URL" : null),
                    ((0, phone_number_utils_1.isVoiceUrlSet)(this.pns[0].voiceUrl) ? "Voice webhook URL" : null),
                ].filter(x => x);
                if (pnConfigAlreadySet.length > 0 && !this.cliSettings.forceMode) {
                    throw new TwilioCliError(`Cannot use ${phoneNumber} because the following config for that phone number would be overwritten: ` + pnConfigAlreadySet.join(", "));
                }
                this.cliSettings.phoneNumber = reformatTwilioPns(this.pns)["phone-numbers"][0];
            }
            if (flags['port']) {
                const port = yield flags['port'];
                try {
                    if ((0, helpers_1.isValidPort)(port)) {
                        this.port = parseInt(port);
                    }
                    else {
                        throw new TwilioCliError(`❗️ '${port}' is not a valid port. 😳 I'll try to get set up with ${this.port} instead.`);
                    }
                }
                catch (err) {
                    console.error(err.message);
                }
            }
        });
    }
    twilioCliIsConfiguredWithApiKey() {
        return this.currentProfile.apiKey.startsWith("SK");
    }
    reuseOrCreateApiKey() {
        return __awaiter(this, void 0, void 0, function* () {
            // We need an API KEY and SECRET to create the Access Token
            // Depending on how the user has provided the CLI with creds
            // we may have one already in this.currentProfile, or we may
            // need to create a new one
            if (this.twilioCliIsConfiguredWithApiKey()) {
                // This case is if the user has _not_ used env vars for
                // their creds. Here we can reuse the api keys and secret
                // that the CLI created when it was installed
                console.log("✅ I'm using your profile API key.\n");
                return {
                    sid: this.currentProfile.apiKey,
                    secret: this.currentProfile.apiSecret
                };
            }
            else {
                // This case is if the user has started the CLI with
                // $TWILIO_ACCOUNT_SID and $TWILIO_AUTH_TOKEN set in
                // their environment, using their account creds but
                // their API_KEY and SECRET are not properly set.
                // the CLI uses the ACCOUNT_SID into currentProfile.apiKey
                // and we need to generate another key
                console.log("💻 I'm creating a new API Key...");
                yield this.destroyApiKeys();
                try {
                    const key = yield this.twilioClient.newKeys.create({ friendlyName: this.devPhoneName });
                    console.log(`✅ I'm using the API Key ${key.sid}\n`);
                    this.currentProfile.apiKey = key.sid;
                    this.currentProfile.apiSecret = key.secret;
                    return {
                        sid: this.currentProfile.apiKey,
                        secret: this.currentProfile.apiSecret
                    };
                }
                catch (err) {
                    console.error(err);
                }
            }
        });
    }
    destroyApiKeys() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.twilioCliIsConfiguredWithApiKey()) {
                // we never created one
                return;
            }
            else {
                try {
                    const keys = yield this.twilioClient.keys.list();
                    const devPhoneKeys = keys.filter((key) => {
                        return key.friendlyName !== null && key.friendlyName.startsWith('dev-phone');
                    });
                    if (devPhoneKeys.length > 0) {
                        console.log('🚮 Removing existing dev phone API Keys');
                        devPhoneKeys.forEach((key) => __awaiter(this, void 0, void 0, function* () {
                            yield this.twilioClient.keys(key.sid).remove();
                        }));
                    }
                }
                catch (err) {
                    console.error(err);
                }
            }
        });
    }
    createTwimlApp() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('💻 Creating a new TwiMl App to allow voice calls from your browser...');
            yield this.destroyTwimlApps();
            try {
                const app = yield this.twilioClient.applications
                    .create({
                    voiceUrl: this.voiceOutboundUrl,
                    friendlyName: this.devPhoneName
                });
                console.log(`✅ I'm using the TwiMl App ${app.sid}\n`);
                return app;
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    destroyTwimlApps() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const applications = yield this.twilioClient.applications.list();
                const devPhoneApps = applications.filter((twimlApp) => {
                    return twimlApp.friendlyName !== null && twimlApp.friendlyName.startsWith('dev-phone');
                });
                if (devPhoneApps.length > 0) {
                    console.log('🚮 Removing existing dev phone TwiML apps');
                    devPhoneApps.forEach((twimlApp) => __awaiter(this, void 0, void 0, function* () {
                        yield this.twilioClient.applications(twimlApp.sid)
                            .remove();
                    }));
                }
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    createJwt() {
        return __awaiter(this, void 0, void 0, function* () {
            const chatGrant = new ChatGrant({
                serviceSid: this.conversation.serviceSid
            });
            const voiceGrant = new VoiceGrant({
                incomingAllow: true,
                outgoingApplicationSid: this.twimlApp.sid
            });
            const syncGrant = new SyncGrant({
                serviceSid: this.sync.sid,
            });
            const token = new AccessToken(this.twilioClient.accountSid, this.apikey.sid, this.apikey.secret, {
                identity: this.devPhoneName,
                ttl: 24 * 60 * 60
            });
            token.addGrant(chatGrant);
            token.addGrant(voiceGrant);
            token.addGrant(syncGrant);
            return token.toJwt();
        });
    }
    createSync() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('💻 Creating a new sync list for call history...');
            yield this.destroySyncs();
            try {
                const syncService = yield this.twilioClient.sync.services
                    .create({ friendlyName: this.devPhoneName });
                console.log(`✅ I'm using the sync service ${syncService.sid}\n`);
                // create 'CallLog' syncMap
                yield this.twilioClient.sync.services(syncService.sid).syncMaps.create({
                    uniqueName: CALL_LOG_MAP_NAME,
                });
                return syncService;
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    destroySyncs() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const syncServices = yield this.twilioClient.sync.services.list();
                const devPhoneSyncServices = syncServices.filter((syncService) => {
                    return syncService.friendlyName !== null && syncService.friendlyName.startsWith('dev-phone');
                });
                if (devPhoneSyncServices.length > 0) {
                    console.log('🚮 Removing existing dev phone Sync Services');
                    devPhoneSyncServices.forEach((syncService) => __awaiter(this, void 0, void 0, function* () {
                        yield this.twilioClient.sync.services(syncService.sid)
                            .remove();
                    }));
                }
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    // Creates a new conversation service, a conversation, and makes the dev phone a participant
    createConversation() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.destroyConversations();
            console.log('💻 Creating a new conversation...');
            try {
                const service = yield this.twilioClient.conversations.services
                    .create({ friendlyName: 'dev-phone' });
                const conversationService = this.twilioClient.conversations.services(service.sid);
                const newConversation = yield conversationService.conversations.create({ friendlyName: this.devPhoneName });
                yield conversationService.conversations(newConversation.sid)
                    .participants.create({ identity: this.devPhoneName });
                console.log(`✅ I'm using the conversation ${newConversation.sid} from service ${service.sid}\n`);
                return {
                    serviceSid: service.sid,
                    sid: newConversation.sid
                };
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    destroyConversations() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const convoServices = yield this.twilioClient.conversations.services.list();
                const devPhoneConvoServices = convoServices.filter((convoService) => {
                    return convoService.friendlyName !== null && convoService.friendlyName.startsWith('dev-phone');
                });
                if (devPhoneConvoServices.length > 0) {
                    console.log('🚮 Removing existing dev phone Conversation Services');
                    devPhoneConvoServices.forEach((convoService) => __awaiter(this, void 0, void 0, function* () {
                        yield this.twilioClient.conversations.services(convoService.sid)
                            .remove();
                    }));
                }
            }
            catch (err) {
                console.error(err);
            }
        });
    }
}
DevPhoneServer.description = `Dev Phone local express server`;
// Example of how to define flags and properties:
// https://github.com/twilio/plugin-debugger/blob/main/src/commands/debugger/logs/list.js#L99-L126
DevPhoneServer.PropertyFlags = {
    "phone-number": core_1.Flags.string({
        description: 'Optional. Associates the Dev Phone with a phone number. Takes a number from the active profile on the Twilio CLI as the parameter.'
    }),
    force: core_1.Flags.boolean({
        char: 'f',
        description: 'Optional. Forces an overwrite of the phone number configuration.',
        dependsOn: ['phone-number']
    }),
    headless: core_1.Flags.boolean({
        description: 'Optional. Prevents the UI from automatically opening in the browser.',
        default: false,
    }),
    port: core_1.Flags.string({
        description: 'Optional. Configures the port of the Dev Phone UI. Takes a valid port as a parameter.',
    })
};
DevPhoneServer.flags = Object.assign(DevPhoneServer.PropertyFlags, TwilioClientCommand.flags);
module.exports = DevPhoneServer;

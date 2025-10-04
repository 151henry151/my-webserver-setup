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
exports.deployServerless = exports.constants = void 0;
const serverless_api_1 = require("@twilio-labs/serverless-api");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.constants = {
    SYNC_CALL_HISTORY: 'sync-call-history',
    INCOMING_CALL_HANDLER: 'incoming-call-handler',
    OUTBOUND_CALL_HANDLER: 'outbound-call-handler',
    INCOMING_MESSAGE_HANDLER: 'incoming-message-handler'
};
function deployServerless(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = {
            username: context.username,
            password: context.password,
            env: context.env,
            pkgJson: {
                "dependencies": {
                    "twilio": "^3.71.3"
                }
            },
            serviceName: context.env.DEV_PHONE_NAME,
            overrideExistingService: true,
            functionsEnv: '',
            functions: [
                {
                    name: 'Sync Call History',
                    path: `/${exports.constants.SYNC_CALL_HISTORY}`,
                    content: fs_1.default.readFileSync(path_1.default.join(__dirname, `../serverless/functions/${exports.constants.SYNC_CALL_HISTORY}.js`)),
                    access: 'protected',
                },
                {
                    name: 'Incoming Call Handler',
                    path: `/${exports.constants.INCOMING_CALL_HANDLER}`,
                    content: fs_1.default.readFileSync(path_1.default.join(__dirname, `../serverless/functions/${exports.constants.INCOMING_CALL_HANDLER}.js`)),
                    access: 'protected',
                },
                {
                    name: 'Incoming Message Handler',
                    path: `/${exports.constants.INCOMING_MESSAGE_HANDLER}`,
                    content: fs_1.default.readFileSync(path_1.default.join(__dirname, `../serverless/functions/${exports.constants.INCOMING_MESSAGE_HANDLER}.js`)),
                    access: 'protected',
                },
                {
                    name: 'Outbound Call Handler',
                    path: `/${exports.constants.OUTBOUND_CALL_HANDLER}`,
                    content: fs_1.default.readFileSync(path_1.default.join(__dirname, `../serverless/functions/${exports.constants.OUTBOUND_CALL_HANDLER}.js`)),
                    access: 'protected',
                },
            ],
            assets: []
        };
        try {
            const client = new serverless_api_1.TwilioServerlessApiClient(config);
            if (context.onUpdate) {
                const onUpdate = context.onUpdate;
                //@ts-ignore
                client.on('status-update', (evt) => {
                    onUpdate(evt);
                });
            }
            //@ts-ignore
            const result = yield client.deployProject(config);
            return result;
        }
        catch (err) {
            console.log(err);
            throw new Error('Issue deploying functions. Try again later');
        }
    });
}
exports.deployServerless = deployServerless;

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePhoneWebhooks = exports.updatePhoneWebhooks = exports.isVoiceUrlSet = exports.isSmsUrlSet = void 0;
function isSmsUrlSet(smsUrl) {
    // consider it "unset" if it is blank, or at the default value
    return smsUrl && smsUrl !== "" && smsUrl !== 'https://demo.twilio.com/welcome/sms/reply';
}
exports.isSmsUrlSet = isSmsUrlSet;
function isVoiceUrlSet(voiceUrl) {
    // consider it "unset" if it is blank, or at the default value
    return voiceUrl && voiceUrl !== "" && voiceUrl !== 'https://demo.twilio.com/welcome/voice/';
}
exports.isVoiceUrlSet = isVoiceUrlSet;
function updatePhoneWebhooks(selectedNumber, incomingPhoneNumbersApi, properties) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!selectedNumber)
            return;
        console.log(`💻 Updating Voice and SMS webhooks for ${selectedNumber.phoneNumber}...`);
        selectedNumber.voiceUrl = properties.voiceUrl;
        selectedNumber.smsUrl = properties.smsUrl;
        selectedNumber.statusCallback = properties.statusCallback;
        try {
            const updated = yield incomingPhoneNumbersApi(selectedNumber.sid)
                .update({
                voiceUrl: properties.voiceUrl,
                smsUrl: properties.smsUrl,
                statusCallback: properties.statusCallback,
            });
            console.log('✅ Webhooks updated\n');
            return updated;
        }
        catch (err) {
            console.error(err);
        }
    });
}
exports.updatePhoneWebhooks = updatePhoneWebhooks;
function removePhoneWebhooks(activeNumber, incomingPhoneNumbersApi) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!activeNumber)
            return;
        console.log(`🚮 Removing incoming Voice and SMS webhooks for ${activeNumber.phoneNumber}`);
        try {
            const updated = yield incomingPhoneNumbersApi(activeNumber.sid)
                .update({
                voiceUrl: "",
                smsUrl: "",
                statusCallback: "",
            });
            return updated;
        }
        catch (err) {
            console.error(err);
        }
    });
}
exports.removePhoneWebhooks = removePhoneWebhooks;

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
function updateCallStatusFromEvent(context, callSid, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = context.getTwilioClient({
            userAgentExtension: [
                `@twilio-labs/plugin-dev-phone/${context.DEV_PHONE_VERSION}`,
                `@twilio-labs/dev-phone/serverless`,
                'serverless-functions'
            ]
        });
        try {
            return yield client.sync
                .services(context.SYNC_SERVICE_SID)
                .syncMaps(context.CALL_LOG_MAP_NAME)
                .syncMapItems(callSid)
                .update({
                data,
            });
        }
        catch (err) {
            return yield client.sync
                .services(context.SYNC_SERVICE_SID)
                .syncMaps(context.CALL_LOG_MAP_NAME)
                .syncMapItems
                .create({
                key: callSid,
                data,
            });
        }
    });
}
exports.handler = function (context, event, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Call: ${event.CallSid} status: ${event.CallStatus}`);
        try {
            const data = {
                Sid: event.CallSid,
                Status: event.CallStatus,
                Duration: event.CallDuration,
                Direction: event.CallDirection,
                From: event.From,
                To: event.To,
                Timestamp: event.Timestamp,
            };
            const item = yield updateCallStatusFromEvent(context, event.CallSid, data);
        }
        catch (err) {
            console.error(err);
            return callback(err);
        }
        return callback(null, {});
    });
};

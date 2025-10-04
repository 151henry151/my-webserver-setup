"use strict";
// Incoming Message Handler
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
exports.handler = function (context, event, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        // receive an SMS and put into a conversation
        const client = context.getTwilioClient({
            userAgentExtension: [
                `@twilio-labs/dev-phone/${context.DEV_PHONE_VERSION}`,
                `@twilio-labs/dev-phone/serverless`,
                'serverless-functions'
            ]
        });
        yield client.conversations
            .services(context.CONVERSATION_SERVICE_SID)
            .conversations(context.CONVERSATION_SID)
            .messages
            .create({
            author: event.From,
            body: event.Body,
            attributes: {
                fromCity: event.FromCity,
                fromCountry: event.FromCountry,
                messageSid: event.MessageSid,
                numMedia: event.NumMedia
            }
        })
            .then(message => console.log(message));
        // Answer with an empty response
        let twiml = new Twilio.twiml.MessagingResponse();
        return callback(null, twiml);
    });
};

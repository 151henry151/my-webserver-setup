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
exports.getAvailablePort = exports.isValidPort = void 0;
const get_port_1 = __importDefault(require("get-port"));
function isValidPort(port) {
    const portRegex = /^((6553[0-5])|(655[0-2][0-9])|(65[0-4][0-9]{2})|(6[0-4][0-9]{3})|([1-5][0-9]{4})|([0-5]{0,5})|([0-9]{1,4}))$/gi;
    return portRegex.test(port);
}
exports.isValidPort = isValidPort;
function getAvailablePort() {
    return __awaiter(this, void 0, void 0, function* () {
        const availablePort = yield (0, get_port_1.default)({ port: [1337, 3000, 3001, 8000, 8080] });
        return availablePort;
    });
}
exports.getAvailablePort = getAvailablePort;

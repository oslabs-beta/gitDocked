"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = (0, express_1.Router)();
router.get('/login', (req, res, next) => {
    const client_id = '32239c9ebb7b81c40e9d';
    const client_secret = '49f9dc62e838915e1ca271715de3b57fdb385dbb';
    ddClient.host.openExternal(`https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}`);
});
console.log(REDIRECT_URI);

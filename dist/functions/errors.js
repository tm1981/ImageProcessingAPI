"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// function to display error messages in json for the api
var jsonErrorMsg = function (msg, res) {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).end(JSON.stringify({ error: msg }));
};
exports.default = { jsonErrorMsg: jsonErrorMsg };

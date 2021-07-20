"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var files_1 = __importDefault(require("../../functions/files"));
var middleware_1 = __importDefault(require("../../functions/middleware"));
var images = express_1.default.Router();
images.get('/', middleware_1.default, function (req, res) {
    if (req.query.resize === 'true') {
        files_1.default
            .resizeImage(req.query.filename, req.query.imgSizeW, req.query.imgSizeH)
            .then(function () {
            var resizedImg = req.query.filename + "-" + req.query.imgSizeW + "-" + req.query.imgSizeH;
            files_1.default.displayImage(resizedImg, res);
            console.log('resizing and displaying new image');
        });
    }
    else {
        files_1.default.displayImage(req.query.file, res);
        console.log('displaying saved image');
    }
});
exports.default = images;

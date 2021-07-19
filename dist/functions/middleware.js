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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = __importDefault(require("./errors"));
var files_1 = __importDefault(require("./files"));
// middleware that check if query parameters are correct and if resized image exists
var validateQuery = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var query, imageFile, imageSize, resizedFileName;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = req.query;
                imageFile = req.query.filename;
                // check if query are valid
                if (imageFile === undefined || query.width === undefined || query.height === undefined) {
                    errors_1.default.jsonErrorMsg('query parameter are missing', res);
                    return [2 /*return*/];
                }
                imageSize = files_1.default.checkWidthHeight(query.width, query.height);
                if (!imageSize) return [3 /*break*/, 5];
                resizedFileName = imageFile + "-" + imageSize[0] + "-" + imageSize[1];
                return [4 /*yield*/, files_1.default.ifImageExists(imageFile, 'full')];
            case 1:
                if (!_a.sent()) return [3 /*break*/, 3];
                return [4 /*yield*/, files_1.default.ifImageExists(resizedFileName, 'thumb')];
            case 2:
                // check if resized image found
                if (_a.sent()) {
                    console.log('resized found');
                    req.query.resize = 'false';
                    req.query.file = resizedFileName; // sending back resized image filename
                    next();
                }
                else {
                    req.query.resize = 'true';
                    req.query.file = imageFile;
                    // sending back image width and height to be used for resizing
                    req.query.imgSizeW = String(imageSize[0]);
                    req.query.imgSizeH = String(imageSize[1]);
                    next();
                }
                return [3 /*break*/, 4];
            case 3:
                errors_1.default.jsonErrorMsg('file not found', res);
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                errors_1.default.jsonErrorMsg('width or height are not valid, width or height should be numbers and not exceed 4000px', res);
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.default = validateQuery;

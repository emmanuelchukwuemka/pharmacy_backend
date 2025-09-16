"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.multerMiddleware = exports.healthcareSecure = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apiResponse_1 = require("../../globals/utility/apiResponse");
const healthcareSecure = (req, res, next) => {
    try {
        console.log("Middleware executed for healthcare module");
        next();
    }
    catch (err) {
        next(err); // Here am just passing the error to global errorHandler
    }
};
exports.healthcareSecure = healthcareSecure;
const multerMiddleware = (maxSize = 50) => {
    try {
        const uploadDir = path_1.default.join(__dirname, "file-uploads");
        if (!fs_1.default.existsSync(uploadDir)) {
            fs_1.default.mkdirSync(uploadDir, { recursive: true });
        }
        const storage = multer_1.default.diskStorage({
            destination: function (req, file, cb) {
                cb(null, uploadDir);
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + path_1.default.extname(file.originalname));
            },
        });
        return (0, multer_1.default)({
            storage,
            limits: {
                fileSize: maxSize * 1024 * 1024,
            },
        });
    }
    catch (error) {
        console.log(error);
        throw new Error("Multer error: " + error);
    }
};
exports.multerMiddleware = multerMiddleware;
// Auth
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 401,
            message: "No token provided",
        });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 401,
            message: "Invalid or expired token",
        });
    }
};
exports.verifyToken = verifyToken;

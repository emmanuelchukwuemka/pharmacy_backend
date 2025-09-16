"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = exports.deleteFile = void 0;
exports.uploadFile = uploadFile;
exports.generatePatientId = generatePatientId;
const axios_1 = __importDefault(require("axios"));
const form_data_1 = __importDefault(require("form-data"));
const fs_1 = __importDefault(require("fs"));
// import { customAlphabet } from "nanoid";
const promises_1 = __importDefault(require("fs/promises"));
const deleteFile = async (filePath) => {
    try {
        await promises_1.default.access(filePath); // Check if file exists
        await promises_1.default.unlink(filePath); // Delete the file
        console.log(`✅ File deleted: ${filePath}`);
    }
    catch (err) {
        if (err.code === "ENOENT") {
            console.warn(`⚠️ File not found, skipping delete: ${filePath}`);
        }
        else {
            console.error(`Error deleting file: ${err.message}`);
            throw new Error("Error occurred while deleting file");
        }
    }
};
exports.deleteFile = deleteFile;
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = "CustomError";
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.CustomError = CustomError;
async function uploadFile(filePath, uploadUrl) {
    try {
        const form = new form_data_1.default();
        form.append("file", fs_1.default.createReadStream(filePath));
        const response = await axios_1.default.post(uploadUrl, form, {
            headers: form.getHeaders(),
        });
        return {
            success: true,
            message: response.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error.response?.data || error.message,
        };
    }
    finally {
        (0, exports.deleteFile)(filePath);
    }
}
const ShortUniqueId = require("short-unique-id");
const letterGen = new ShortUniqueId({
    length: 3,
    dictionary: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
});
const digitGen = new ShortUniqueId({
    length: 5,
    dictionary: "0123456789".split(""),
});
function generatePatientId() {
    return `${letterGen.randomUUID()}${digitGen.randomUUID()}`; // 'ABC12345'
}

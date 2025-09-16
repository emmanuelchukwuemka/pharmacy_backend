"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.labSecure = void 0;
const labSecure = (req, res, next) => {
    try {
        console.log("Middleware executed for lab module");
        next();
    }
    catch (err) {
        next(err); // Here am just passing the error to global errorHandler
    }
};
exports.labSecure = labSecure;

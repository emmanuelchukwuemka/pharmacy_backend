"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clinicSecure = void 0;
const clinicSecure = (req, res, next) => {
    try {
        console.log("Middleware executed for clinic module");
        next();
    }
    catch (err) {
        next(err); // Here am just passing the error to global errorHandler
    }
};
exports.clinicSecure = clinicSecure;

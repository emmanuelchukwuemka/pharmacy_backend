"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clinic_routes_1 = __importDefault(require("./clinic.routes"));
const clinic_middlewares_1 = require("./clinic.middlewares");
const router = (0, express_1.Router)();
router.use("/", clinic_middlewares_1.clinicSecure, clinic_routes_1.default);
exports.default = router;

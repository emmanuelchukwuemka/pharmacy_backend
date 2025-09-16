"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const healthcare_routes_1 = __importDefault(require("./healthcare.routes"));
const healthcare_middlewares_1 = require("./healthcare.middlewares");
const clinic_1 = __importDefault(require("./clinic"));
const lab_1 = __importDefault(require("./lab"));
const pharmacy_1 = __importDefault(require("./pharmacy"));
const router = (0, express_1.Router)();
router.use("/", healthcare_middlewares_1.healthcareSecure, healthcare_routes_1.default);
router.use("/clinic", clinic_1.default);
router.use("/lab", healthcare_middlewares_1.verifyToken, lab_1.default);
router.use("/pharmacy", healthcare_middlewares_1.verifyToken, pharmacy_1.default);
exports.default = router;

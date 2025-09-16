"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pharmacy_routes_1 = __importDefault(require("./pharmacy.routes"));
const pharmacy_middlewares_1 = require("./pharmacy.middlewares");
const router = (0, express_1.Router)();
router.use("/", pharmacy_middlewares_1.pharmacySecure, pharmacy_routes_1.default);
exports.default = router;

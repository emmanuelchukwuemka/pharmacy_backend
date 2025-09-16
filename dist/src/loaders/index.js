"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("../loaders/express"));
const database_1 = __importDefault(require("../loaders/database"));
const healthcare_models_associations_1 = require("../modules/healthcare/healthcare.models.associations");
// import eventsLoader from "./events";
exports.default = async (app) => {
    await (0, database_1.default)();
    // await syncedDB(); // Commented out to use existing database schema
    // set up sequelize model associations here
    (0, healthcare_models_associations_1.setupAssociations)();
    (0, express_1.default)(app);
    // eventsLoader();
};

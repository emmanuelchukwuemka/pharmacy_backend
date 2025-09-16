"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLabTestService = void 0;
const healthcare_helpers_1 = require("../../healthcare.helpers");
const LabTestsCatalogue_model_1 = require("../lab_models/LabTestsCatalogue.model");
const LabUser_1 = require("../lab_models/LabUser");
const createLabTestService = async (data) => {
    try {
        const labIdExists = await LabUser_1.LabUser.findOne({ where: { id: data.labId } });
        if (!labIdExists) {
            throw new healthcare_helpers_1.CustomError(`Lab with ID: ${data.labId} does not exist.`, 404);
        }
        if (!isValidTatDuration(data.tat)) {
            throw new healthcare_helpers_1.CustomError(`TAT format is invalid. Please use formats like '24h', '30m', '15d', etc.`, 400);
        }
        const newLabTest = await LabTestsCatalogue_model_1.LabTestsCatalogue.create({ ...data });
        if (!newLabTest) {
            throw new healthcare_helpers_1.CustomError("Failed to create the lab test. Please try again.", 500);
        }
        return {
            success: true,
            message: `${data.testName} has been successfully created and added to your tests catalogue.`,
            data: newLabTest,
        };
    }
    catch (error) {
        console.log(error);
        throw new healthcare_helpers_1.CustomError(error.message || error, error.statusCode || 500);
    }
};
exports.createLabTestService = createLabTestService;
function isValidTatDuration(tat) {
    if (!tat)
        return true; // allow null or undefined
    const trimmed = tat.trim().toLowerCase();
    return /^(\d+(\.\d+)?)(h|m|s|d|w)$/.test(trimmed);
    //   return /^[0-9]+(h|m|s|d|w)$/.test(trimmed);
}

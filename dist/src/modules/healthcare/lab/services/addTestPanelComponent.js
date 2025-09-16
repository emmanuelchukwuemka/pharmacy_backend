"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTestPanelComponentService = void 0;
const healthcare_helpers_1 = require("../../healthcare.helpers");
const LabTestsCatalogue_model_1 = require("../lab_models/LabTestsCatalogue.model");
const TestPanelComponents_1 = require("../lab_models/TestPanelComponents");
const addTestPanelComponentService = async (data) => {
    try {
        const { testId } = data;
        const testExists = await LabTestsCatalogue_model_1.LabTestsCatalogue.findOne({
            where: { id: testId },
        });
        if (!testExists) {
            throw new healthcare_helpers_1.CustomError("Test id doest not match any existing tests", 400);
        }
        const newPanelComponentData = await TestPanelComponents_1.TestPanelComponent.create(data);
        return {
            success: true,
            message: `New component (${data.componentName}) added under the test panel: ${testExists.testName}`,
            data: "",
        };
    }
    catch (error) {
        console.log(error);
        throw new healthcare_helpers_1.CustomError(error.message || error, error.statusCode || 500);
    }
};
exports.addTestPanelComponentService = addTestPanelComponentService;
function isValidTatDuration(tat) {
    if (!tat)
        return true; // allow null or undefined
    const trimmed = tat.trim().toLowerCase();
    return /^(\d+(\.\d+)?)(h|m|s|d|w)$/.test(trimmed);
    //   return /^[0-9]+(h|m|s|d|w)$/.test(trimmed);
}

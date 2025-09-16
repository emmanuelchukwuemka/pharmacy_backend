"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLabReportService = void 0;
const healthcare_helpers_1 = require("../../healthcare.helpers");
const healthcare_models_1 = require("../../healthcare.models");
const LabTestsCatalogue_model_1 = require("../lab_models/LabTestsCatalogue.model");
const MedicalReport_1 = require("../lab_models/MedicalReport");
const createLabReportService = async (data) => {
    try {
        const { patientId, testId } = data;
        const patientIdExists = await healthcare_models_1.PatientData.findOne({ where: { patientId } });
        if (!patientIdExists) {
            throw new healthcare_helpers_1.CustomError("Patient ID does not exist", 400);
        }
        const testIdExists = await LabTestsCatalogue_model_1.LabTestsCatalogue.findOne({
            where: { id: testId },
        });
        if (testId && !testIdExists) {
            throw new healthcare_helpers_1.CustomError("Test ID does not exist", 400);
        }
        const newReport = await MedicalReport_1.MedicalReport.create(data);
        return {
            success: true,
            message: `Lab report created successfully!`,
            data: newReport,
        };
    }
    catch (error) {
        console.log(error);
        throw new healthcare_helpers_1.CustomError(error.message || error, error.statusCode || 500);
    }
};
exports.createLabReportService = createLabReportService;

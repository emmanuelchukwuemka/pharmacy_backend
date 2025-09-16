"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAssociations = void 0;
const healthcare_models_1 = require("./healthcare.models");
const LabNotifications_model_1 = require("./lab/lab_models/LabNotifications.model");
const LabReports_model_1 = require("./lab/lab_models/LabReports.model");
const LabResults_model_1 = require("./lab/lab_models/LabResults.model");
const LabTestsCatalogue_model_1 = require("./lab/lab_models/LabTestsCatalogue.model");
const LabUser_1 = require("./lab/lab_models/LabUser");
const LabUserSettings_1 = require("./lab/lab_models/LabUserSettings");
const MedicalReport_1 = require("./lab/lab_models/MedicalReport");
const TestPanelComponents_1 = require("./lab/lab_models/TestPanelComponents");
const setupAssociations = () => {
    ////////////// LAB ASSOCIATIONS ////////////////
    healthcare_models_1.HealthcareUser.hasMany(LabUser_1.LabUser, {
        foreignKey: "healthcareUserId",
        as: "labUserData",
    });
    LabUser_1.LabUser.belongsTo(healthcare_models_1.HealthcareUser, {
        foreignKey: "healthcareUserId",
        as: "healthcareUserData",
    });
    LabUser_1.LabUser.hasMany(LabTestsCatalogue_model_1.LabTestsCatalogue, {
        foreignKey: "labId",
        as: "labTestsCatalogue",
    });
    LabUser_1.LabUser.hasMany(LabNotifications_model_1.LabNotifications, {
        foreignKey: "labId",
        as: "labNotifications",
    });
    LabUser_1.LabUser.hasMany(LabReports_model_1.LabReport, {
        foreignKey: "labId",
        as: "LabReports",
    });
    LabUser_1.LabUser.hasMany(LabUserSettings_1.LabUserSettings, {
        foreignKey: "labId",
        as: "LabUserSettings",
    });
    healthcare_models_1.PatientData.hasMany(LabReports_model_1.LabReport, {
        foreignKey: "patientId",
        as: "LabReports",
    });
    LabTestsCatalogue_model_1.LabTestsCatalogue.hasMany(LabReports_model_1.LabReport, {
        foreignKey: "testId",
        as: "LabReports",
    });
    LabReports_model_1.LabReport.hasMany(LabResults_model_1.LabResult, {
        foreignKey: "testId",
        as: "LabReports",
    });
    TestPanelComponents_1.TestPanelComponent.hasMany(LabResults_model_1.LabResult, {
        foreignKey: "componentId",
        as: "TestPanelComponents",
    });
    MedicalReport_1.MedicalReport.hasMany(healthcare_models_1.PatientData, {
        foreignKey: "patientId",
        as: "PatientData",
    });
    MedicalReport_1.MedicalReport.hasMany(LabTestsCatalogue_model_1.LabTestsCatalogue, {
        foreignKey: "id",
        as: "TestData",
    });
    LabTestsCatalogue_model_1.LabTestsCatalogue.belongsTo(LabUser_1.LabUser, {
        foreignKey: "labId",
        as: "LabUserData",
    });
    LabNotifications_model_1.LabNotifications.belongsTo(LabUser_1.LabUser, {
        foreignKey: "labId",
        as: "LabUserData",
    });
    LabReports_model_1.LabReport.belongsTo(LabUser_1.LabUser, {
        foreignKey: "labId",
        as: "LabUserData",
    });
    LabUserSettings_1.LabUserSettings.belongsTo(LabUser_1.LabUser, {
        foreignKey: "labId",
        as: "LabUserData",
    });
    LabReports_model_1.LabReport.belongsTo(healthcare_models_1.PatientData, {
        foreignKey: "patientId",
        as: "PatientData",
    });
    LabReports_model_1.LabReport.belongsTo(LabTestsCatalogue_model_1.LabTestsCatalogue, {
        foreignKey: "testId",
        as: "labTestDetails",
    });
    LabResults_model_1.LabResult.belongsTo(LabReports_model_1.LabReport, {
        foreignKey: "reportId",
        as: "labReport",
    });
    LabResults_model_1.LabResult.belongsTo(TestPanelComponents_1.TestPanelComponent, {
        foreignKey: "componentId",
        as: "TestPanelComponent",
    });
    healthcare_models_1.PatientData.belongsTo(MedicalReport_1.MedicalReport, {
        foreignKey: "patientId",
        as: "medicalReport",
    });
    LabTestsCatalogue_model_1.LabTestsCatalogue.belongsTo(MedicalReport_1.MedicalReport, {
        foreignKey: "id",
        as: "medicalReport",
    });
};
exports.setupAssociations = setupAssociations;

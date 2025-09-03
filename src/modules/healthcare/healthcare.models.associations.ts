import { HealthcareUser, PatientData } from "./healthcare.models";
import { LabNotifications } from "./lab/lab_models/LabNotifications.model";
import { LabReport } from "./lab/lab_models/LabReports.model";
import { LabResult } from "./lab/lab_models/LabResults.model";
import { LabTestsCatalogue } from "./lab/lab_models/LabTestsCatalogue.model";
import { LabUser } from "./lab/lab_models/LabUser";
import { LabUserSettings } from "./lab/lab_models/LabUserSettings";
import { TestPanelComponent } from "./lab/lab_models/TestPanelComponents";

export const setupAssociations = () => {
  ////////////// LAB ASSOCIATIONS ////////////////
  HealthcareUser.hasMany(LabUser, {
    foreignKey: "healthcareUserId",
    as: "labUserData",
  });

  LabUser.belongsTo(HealthcareUser, {
    foreignKey: "healthcareUserId",
    as: "healthcareUserData",
  });

  LabUser.hasMany(LabTestsCatalogue, {
    foreignKey: "labId",
    as: "labTestsCatalogue",
  });

  LabUser.hasMany(LabNotifications, {
    foreignKey: "labId",
    as: "labNotifications",
  });

  LabUser.hasMany(LabReport, {
    foreignKey: "labId",
    as: "LabReports",
  });

  LabUser.hasMany(LabUserSettings, {
    foreignKey: "labId",
    as: "LabUserSettings",
  });

  PatientData.hasMany(LabReport, {
    foreignKey: "patientId",
    as: "LabReports",
  });

  LabTestsCatalogue.hasMany(LabReport, {
    foreignKey: "testId",
    as: "LabReports",
  });

  LabReport.hasMany(LabResult, {
    foreignKey: "testId",
    as: "LabReports",
  });

  TestPanelComponent.hasMany(LabResult, {
    foreignKey: "componentId",
    as: "TestPanelComponents",
  });

  LabTestsCatalogue.belongsTo(LabUser, {
    foreignKey: "labId",
    as: "LabUserData",
  });

  LabNotifications.belongsTo(LabUser, {
    foreignKey: "labId",
    as: "LabUserData",
  });

  LabReport.belongsTo(LabUser, {
    foreignKey: "labId",
    as: "LabUserData",
  });

  LabUserSettings.belongsTo(LabUser, {
    foreignKey: "labId",
    as: "LabUserData",
  });

  LabReport.belongsTo(PatientData, {
    foreignKey: "patientId",
    as: "PatientData",
  });

  LabReport.belongsTo(LabTestsCatalogue, {
    foreignKey: "testId",
    as: "labTestDetails",
  });

  LabResult.belongsTo(LabReport, {
    foreignKey: "reportId",
    as: "labReport",
  });

  LabResult.belongsTo(TestPanelComponent, {
    foreignKey: "reportId",
    as: "labReport",
  });
};

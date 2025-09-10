import { CustomError } from "../../healthcare.helpers";
import { PatientData } from "../../healthcare.models";
import { errorObject } from "../../healthcare.types";
import { CreateLabReportInput } from "../lab.validations";
import { LabTestsCatalogue } from "../lab_models/LabTestsCatalogue.model";
import { MedicalReport } from "../lab_models/MedicalReport";

export const createLabReportService = async (data: CreateLabReportInput) => {
  try {
    const { patientId, testId } = data;
    const patientIdExists = await PatientData.findOne({ where: { patientId } });

    if (!patientIdExists) {
      throw new CustomError("Patient ID does not exist", 400);
    }

    const testIdExists = await LabTestsCatalogue.findOne({
      where: { id: testId },
    });
    if (testId && !testIdExists) {
      throw new CustomError("Test ID does not exist", 400);
    }

    const newReport = await MedicalReport.create(data);

    return {
      success: true,
      message: `Lab report created successfully!`,
      data: newReport,
    };
  } catch (error: errorObject | any) {
    console.log(error);
    throw new CustomError(error.message || error, error.statusCode || 500);
  }
};

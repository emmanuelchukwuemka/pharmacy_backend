import { CustomError } from "../../healthcare.helpers";
import { errorObject } from "../../healthcare.types";
import { CreateLabTestSchemaInput } from "../lab.validations";
import { LabTestsCatalogue } from "../lab_models/LabTestsCatalogue.model";
import { LabUser } from "../lab_models/LabUser";

export const createLabTestService = async (data: CreateLabTestSchemaInput) => {
  try {
    const labIdExists = await LabUser.findOne({ where: { id: data.labId } });
    if (!labIdExists) {
      throw new CustomError(`Lab with ID: ${data.labId} does not exist.`, 404);
    }

    if (!isValidTatDuration(data.tat)) {
      throw new CustomError(
        `TAT format is invalid. Please use formats like '24h', '30m', '15d', etc.`,
        400
      );
    }

    const newLabTest = await LabTestsCatalogue.create({ ...data });
    if (!newLabTest) {
      throw new CustomError(
        "Failed to create the lab test. Please try again.",
        500
      );
    }

    return {
      success: true,
      message: `${data.testName} has been successfully created and added to your tests catalogue.`,
      data: newLabTest,
    };
  } catch (error: errorObject | any) {
    console.log(error);
    throw new CustomError(error.message || error, error.statusCode || 500);
  }
};

function isValidTatDuration(tat: string | null | undefined): boolean {
  if (!tat) return true; // allow null or undefined

  const trimmed = tat.trim().toLowerCase();
  return /^(\d+(\.\d+)?)(h|m|s|d|w)$/.test(trimmed);
  //   return /^[0-9]+(h|m|s|d|w)$/.test(trimmed);
}

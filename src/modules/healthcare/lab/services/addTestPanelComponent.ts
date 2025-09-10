import { CustomError } from "../../healthcare.helpers";
import { errorObject } from "../../healthcare.types";
import { AddTestPanelComponentInput } from "../lab.validations";
import { LabTestsCatalogue } from "../lab_models/LabTestsCatalogue.model";
import { TestPanelComponent } from "../lab_models/TestPanelComponents";

export const addTestPanelComponentService = async (
  data: AddTestPanelComponentInput
) => {
  try {
    const { testId } = data;
    const testExists = await LabTestsCatalogue.findOne({
      where: { id: testId },
    });
    if (!testExists) {
      throw new CustomError("Test id doest not match any existing tests", 400);
    }
    const newPanelComponentData = await TestPanelComponent.create(data);

    return {
      success: true,
      message: `New component (${data.componentName}) added under the test panel: ${testExists.testName}`,
      data: "",
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

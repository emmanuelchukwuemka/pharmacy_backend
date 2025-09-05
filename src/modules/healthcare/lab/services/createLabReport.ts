import { CustomError } from "../../healthcare.helpers";
import { errorObject } from "../../healthcare.types";
// import {  UserInput } from "../user.validations";

export const createLabReportService = async () => {
  try {
    return {
      success: true,
      message: ` has been successfully registered with Bloomzon lab under the owner name.`,
      data: "",
    };
  } catch (error: any) {
    console.log(error);
    throw new CustomError(error.message || error, error.statusCode || 500);
  }
};

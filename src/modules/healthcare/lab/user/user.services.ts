import { Request } from "express";
import jwt from "jsonwebtoken";
import { CustomError, deleteFile, uploadFile } from "../../healthcare.helpers";
import { errorObject } from "../../healthcare.types";
import { MulterFiles } from "./user.types";
import { LoginInput, UserInput } from "./user.validations";
import { getLabUser } from "./user.helpers";
import { LabUser, LabUserAttributes } from "../lab_models/LabUser";

export const userMethod = async (data: UserInput) => {
  try {
    // Abeg ur business logic should go here

    return {
      success: true,
      message: "User action completed successfully",
      data: { id: 1 },
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "User action failed",
    };
  }
};

export const signUp = async (
  req: Request,
  files: MulterFiles,
  data: UserInput
) => {
  const filesArray = Object.values(files);
  try {
    // first check if user with email or labName already exist
    const existingUser: LabUserAttributes | null = await LabUser.findOne({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new CustomError("Email already in use", 409);
    }

    const healthcareUserId: string = req?.user?.userId;
    if (!healthcareUserId)
      throw new CustomError("Invalid token: No user ID found", 401);

    let profilePicUrl: string = "";
    let coverPhotoUrl: string = "";

    if (filesArray.length < 2) {
      throw new CustomError(
        "You must provide both Profile photo and Cover photo",
        400
      ) as errorObject;
    } else if (filesArray.length > 2) {
      throw new CustomError(
        "You can only upload 1 Profile picture and 1 Cover photo",
        400
      ) as errorObject;
    }

    const acceptedFileNames: string[] = ["profilePic", "coverPhoto"];

    for (const fileOrFiles of filesArray) {
      if (Array.isArray(fileOrFiles)) {
        for (const file of fileOrFiles) {
          if (!acceptedFileNames.includes(file.fieldname)) {
            throw new CustomError(
              `Unrecognized file name: ${file.fieldname}. Please name file correctly: 'profilePic' or 'coverPhoto'.`,
              400
            );
          }
          const uploadResponse = await uploadFile(
            file.path,
            "https://uploads.bloomzon.com"
          );
          if (uploadResponse.success) {
            if (file.fieldname === "profilePic")
              profilePicUrl = uploadResponse.message.fileUrl;
            if (file.fieldname === "coverPhoto")
              coverPhotoUrl = uploadResponse.message.fileUrl;
          } else {
            throw new CustomError(
              "An error occurred during file upload to our remote server",
              501
            );
          }
        }
      } else if (fileOrFiles) {
        throw new CustomError(
          "You must provide both Profile photo and Cover photo",
          400
        );
      }
    }

    // Save user to DB
    const newUser = {
      ...data,
      profilePicUrl,
      coverPhotoUrl,
      healthcareUserId: healthcareUserId, // Associate lab with healthcare user by setting the healthcareUserId
    };

    const createdUser: LabUserAttributes = await LabUser.create(newUser);
    if (!createdUser)
      throw new CustomError(
        "User registration error: failed to save user data to database.",
        500
      );

    return {
      success: true,
      message: `${data.labName} has been successfully registered with Bloomzon lab under the owner name ${data.fullName} .`,
      data: createdUser,
    };
  } catch (error: any) {
    console.log(error);
    throw new CustomError(error.message || error, error.statusCode || 500);
  } finally {
    const cleanupFiles = (fileList: { path: string }[]) => {
      for (const file of fileList) {
        if (file?.path) deleteFile(file.path);
      }
    };
    cleanupFiles(filesArray.flat());
  }
};
// const user: LabUserAttributes | null = await getLabUser(identifier);

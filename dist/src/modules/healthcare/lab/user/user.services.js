"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = exports.userMethod = void 0;
const healthcare_helpers_1 = require("../../healthcare.helpers");
const LabUser_1 = require("../lab_models/LabUser");
const userMethod = async (data) => {
    try {
        // Abeg ur business logic should go here
        return {
            success: true,
            message: "User action completed successfully",
            data: { id: 1 },
        };
    }
    catch (error) {
        console.error(error);
        return {
            success: false,
            message: "User action failed",
        };
    }
};
exports.userMethod = userMethod;
const signUp = async (req, files, data) => {
    const filesArray = Object.values(files);
    try {
        // first check if user with email or labName already exist
        const existingUser = await LabUser_1.LabUser.findOne({
            where: { email: data.email },
        });
        if (existingUser) {
            throw new healthcare_helpers_1.CustomError("Email already in use", 409);
        }
        const healthcareUserId = req?.user?.userId;
        if (!healthcareUserId)
            throw new healthcare_helpers_1.CustomError("Invalid token: No user ID found", 401);
        let profilePicUrl = "";
        let coverPhotoUrl = "";
        if (filesArray.length < 2) {
            throw new healthcare_helpers_1.CustomError("You must provide both Profile photo and Cover photo", 400);
        }
        else if (filesArray.length > 2) {
            throw new healthcare_helpers_1.CustomError("You can only upload 1 Profile picture and 1 Cover photo", 400);
        }
        const acceptedFileNames = ["profilePic", "coverPhoto"];
        for (const fileOrFiles of filesArray) {
            if (Array.isArray(fileOrFiles)) {
                for (const file of fileOrFiles) {
                    if (!acceptedFileNames.includes(file.fieldname)) {
                        throw new healthcare_helpers_1.CustomError(`Unrecognized file name: ${file.fieldname}. Please name file correctly: 'profilePic' or 'coverPhoto'.`, 400);
                    }
                    const uploadResponse = await (0, healthcare_helpers_1.uploadFile)(file.path, "https://uploads.bloomzon.com");
                    if (uploadResponse.success) {
                        if (file.fieldname === "profilePic")
                            profilePicUrl = uploadResponse.message.fileUrl;
                        if (file.fieldname === "coverPhoto")
                            coverPhotoUrl = uploadResponse.message.fileUrl;
                    }
                    else {
                        throw new healthcare_helpers_1.CustomError("An error occurred during file upload to our remote server", 501);
                    }
                }
            }
            else if (fileOrFiles) {
                throw new healthcare_helpers_1.CustomError("You must provide both Profile photo and Cover photo", 400);
            }
        }
        // Save user to DB
        const newUser = {
            ...data,
            profilePicUrl,
            coverPhotoUrl,
            healthcareUserId: healthcareUserId, // Associate lab with healthcare user by setting the healthcareUserId
        };
        const createdUser = await LabUser_1.LabUser.create(newUser);
        if (!createdUser)
            throw new healthcare_helpers_1.CustomError("User registration error: failed to save user data to database.", 500);
        return {
            success: true,
            message: `${data.labName} has been successfully registered with Bloomzon lab under the owner name ${data.fullName} .`,
            data: createdUser,
        };
    }
    catch (error) {
        console.log(error);
        throw new healthcare_helpers_1.CustomError(error.message || error, error.statusCode || 500);
    }
    finally {
        const cleanupFiles = (fileList) => {
            for (const file of fileList) {
                if (file?.path)
                    (0, healthcare_helpers_1.deleteFile)(file.path);
            }
        };
        cleanupFiles(filesArray.flat());
    }
};
exports.signUp = signUp;
// const user: LabUserAttributes | null = await getLabUser(identifier);

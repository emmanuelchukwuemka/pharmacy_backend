import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { HealthcareUser, PatientData } from "./healthcare.models";
import {
  HealthcareUserInput,
  HealthcareLoginInput,
  CreatePatientInput,
} from "./healthcare.validations";
import { CustomError } from "./healthcare.helpers";
import { Op } from "sequelize";

export const healthcareSignUp = async (data: HealthcareUserInput) => {
  try {
    const existingUser = await HealthcareUser.findOne({
      where: { [Op.or]: [{ email: data.email }, { phone: data.phone }] },
    });
    if (existingUser) {
      throw new CustomError("Email or Phone number already in use", 409);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await HealthcareUser.create({
      ...data,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return {
      success: true,
      message: "User successfully registered on Bloomzon Healthcare...",
      data: {
        token,
        user: {
          id: newUser.id,
          email: newUser.email,
          fullName: newUser.fullName,
          bloomzonUserId: newUser.bloomzonUserId,
        },
      },
    };
  } catch (error: any) {
    throw new CustomError(error.message || error, error.statusCode || 500);
  }
};

export const healthcareLogin = async (data: HealthcareLoginInput) => {
  try {
    const user = await HealthcareUser.findOne({ where: { email: data.email } });
    if (!user) throw new CustomError("Invalid email or password", 401);

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) throw new CustomError("Invalid email or password", 401);

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return {
      success: true,
      message: "Login successful!",
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          bloomzonUserId: user.bloomzonUserId,
        },
      },
    };
  } catch (error: any) {
    throw new CustomError(error.message || error, error.statusCode || 500);
  }
};

export const createPatient = async (data: CreatePatientInput) => {
  const newPatient = await PatientData.create({ ...data });
  delete newPatient.medicalHistory;
  try {
    return {
      success: true,
      message: "Patient creation successful!",
      data: newPatient,
    };
  } catch (error: any) {
    throw new CustomError(error.message || error, error.statusCode || 500);
  }
};

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { HealthcareUser, PatientData } from "./healthcare.models";
import {
  HealthcareUserInput,
  HealthcareLoginInput,
  CreatePatientInput,
} from "./healthcare.validations";
import { CustomError } from "./healthcare.helpers";
import { emailService } from "../../globals/utility/email";
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
    const { nanoid } = await import('nanoid');
    const verificationToken = nanoid(32);

    const newUser = await HealthcareUser.create({
      ...data,
      password: hashedPassword,
      verificationToken,
      isVerified: false,
      isActive: false,
    });

    // Send verification email
    try {
      await emailService.sendVerificationEmail(newUser.email, verificationToken);
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError);
      // Don't fail registration if email fails, but log it
    }

    return {
      success: true,
      message: "User successfully registered on Bloomzon Healthcare. Please check your email for verification instructions.",
      data: {
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

export const verifyEmail = async (token: string) => {
  try {
    const user = await HealthcareUser.findOne({
      where: { verificationToken: token },
    });

    if (!user) {
      return null;
    }

    // Check if token is expired (24 hours)
    const tokenAge = Date.now() - user.createdAt.getTime();
    const twentyFourHours = 24 * 60 * 60 * 1000;

    if (tokenAge > twentyFourHours) {
      return null;
    }

    // Update user as verified and active
    await user.update({
      isVerified: true,
      isActive: true,
      verificationToken: null, // Clear the token
    });

    return user;
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

    if (!user.isVerified) {
      throw new CustomError("Please verify your email before logging in", 403);
    }

    if (!user.isActive) {
      throw new CustomError("Account is not active", 403);
    }

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

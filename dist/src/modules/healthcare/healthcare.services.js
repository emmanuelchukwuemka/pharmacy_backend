"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPatient = exports.healthcareLogin = exports.verifyEmail = exports.healthcareSignUp = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const healthcare_models_1 = require("./healthcare.models");
const healthcare_helpers_1 = require("./healthcare.helpers");
const email_1 = require("../../globals/utility/email");
const sequelize_1 = require("sequelize");
const healthcareSignUp = async (data) => {
    try {
        const existingUser = await healthcare_models_1.HealthcareUser.findOne({
            where: { [sequelize_1.Op.or]: [{ email: data.email }, { phone: data.phone }] },
        });
        if (existingUser) {
            throw new healthcare_helpers_1.CustomError("Email or Phone number already in use", 409);
        }
        const hashedPassword = await bcryptjs_1.default.hash(data.password, 10);
        const { nanoid } = await Promise.resolve().then(() => __importStar(require('nanoid')));
        const verificationToken = nanoid(32);
        const newUser = await healthcare_models_1.HealthcareUser.create({
            ...data,
            password: hashedPassword,
            verificationToken,
            isVerified: false,
            isActive: false,
        });
        // Send verification email
        try {
            await email_1.emailService.sendVerificationEmail(newUser.email, verificationToken);
        }
        catch (emailError) {
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
    }
    catch (error) {
        throw new healthcare_helpers_1.CustomError(error.message || error, error.statusCode || 500);
    }
};
exports.healthcareSignUp = healthcareSignUp;
const verifyEmail = async (token) => {
    try {
        const user = await healthcare_models_1.HealthcareUser.findOne({
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
    }
    catch (error) {
        throw new healthcare_helpers_1.CustomError(error.message || error, error.statusCode || 500);
    }
};
exports.verifyEmail = verifyEmail;
const healthcareLogin = async (data) => {
    try {
        const user = await healthcare_models_1.HealthcareUser.findOne({ where: { email: data.email } });
        if (!user)
            throw new healthcare_helpers_1.CustomError("Invalid email or password", 401);
        const isMatch = await bcryptjs_1.default.compare(data.password, user.password);
        if (!isMatch)
            throw new healthcare_helpers_1.CustomError("Invalid email or password", 401);
        if (!user.isVerified) {
            throw new healthcare_helpers_1.CustomError("Please verify your email before logging in", 403);
        }
        if (!user.isActive) {
            throw new healthcare_helpers_1.CustomError("Account is not active", 403);
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
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
    }
    catch (error) {
        throw new healthcare_helpers_1.CustomError(error.message || error, error.statusCode || 500);
    }
};
exports.healthcareLogin = healthcareLogin;
const createPatient = async (data) => {
    const newPatient = await healthcare_models_1.PatientData.create({ ...data });
    delete newPatient.medicalHistory;
    try {
        return {
            success: true,
            message: "Patient creation successful!",
            data: newPatient,
        };
    }
    catch (error) {
        throw new healthcare_helpers_1.CustomError(error.message || error, error.statusCode || 500);
    }
};
exports.createPatient = createPatient;

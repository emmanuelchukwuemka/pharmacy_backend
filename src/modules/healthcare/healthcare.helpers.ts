import axios from "axios";
import FormData from "form-data";
import fs from "fs";
// import { customAlphabet } from "nanoid";

import fsp from "fs/promises";
export const deleteFile = async (filePath: string): Promise<void> => {
  try {
    await fsp.access(filePath); // Check if file exists
    await fsp.unlink(filePath); // Delete the file
    console.log(`✅ File deleted: ${filePath}`);
  } catch (err: any) {
    if (err.code === "ENOENT") {
      console.warn(`⚠️ File not found, skipping delete: ${filePath}`);
    } else {
      console.error(`Error deleting file: ${err.message}`);
      throw new Error("Error occurred while deleting file");
    }
  }
};

export class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = "CustomError";
    Error.captureStackTrace(this, this.constructor);
  }
}

export async function uploadFile(filePath: string, uploadUrl: string) {
  try {
    const form = new FormData();
    form.append("file", fs.createReadStream(filePath));

    const response = await axios.post(uploadUrl, form, {
      headers: form.getHeaders(),
    });

    return {
      success: true,
      message: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data || error.message,
    };
  } finally {
    deleteFile(filePath);
  }
}

const ShortUniqueId = require("short-unique-id");

const letterGen = new ShortUniqueId({
  length: 3,
  dictionary: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
});

const digitGen = new ShortUniqueId({
  length: 5,
  dictionary: "0123456789".split(""),
});

export function generatePatientId() {
  return `${letterGen.randomUUID()}${digitGen.randomUUID()}`; // 'ABC12345'
}

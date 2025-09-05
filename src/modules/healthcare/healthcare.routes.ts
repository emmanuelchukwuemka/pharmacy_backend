import { Router } from "express";
import * as healthcareControllers from "./healthcare.controllers";

const router = Router();
// router.post("/", healthcareControllers.sample);
router.post("/sign-up", healthcareControllers.healthcareSignUp);
router.post("/login", healthcareControllers.healthcareLogin);
router.post("/create-patient", healthcareControllers.createPatient);

export default router;

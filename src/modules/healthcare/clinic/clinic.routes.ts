import { Router } from "express";
import * as clinicControllers from "./clinic.controllers";

const router = Router();
router.post("/", clinicControllers.sample);

export default router;

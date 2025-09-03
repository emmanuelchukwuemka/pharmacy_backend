import { Router } from "express";
import healthcareRoutes from "./healthcare.routes";
import { healthcareSecure, verifyToken } from "./healthcare.middlewares";

import clinicModule from "./clinic";
import labModule from "./lab";
const router = Router();
router.use("/", healthcareSecure, healthcareRoutes);

router.use("/clinic", clinicModule);

router.use("/lab", verifyToken, labModule);

export default router;

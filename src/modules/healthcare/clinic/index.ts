import { Router } from "express";
import clinicRoutes from "./clinic.routes";
import { clinicSecure } from "./clinic.middlewares";

const router = Router();
router.use("/", clinicSecure, clinicRoutes);

export default router;

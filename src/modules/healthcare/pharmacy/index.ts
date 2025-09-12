import { Router } from "express";
import pharmacyRoutes from "./pharmacy.routes";
import { pharmacySecure } from "./pharmacy.middlewares";

const router = Router();
router.use("/", pharmacySecure, pharmacyRoutes);

export default router;

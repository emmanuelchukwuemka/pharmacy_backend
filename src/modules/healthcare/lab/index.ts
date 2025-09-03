import { Router } from "express";
import labRoutes from "./lab.routes";
import { labSecure } from "./lab.middlewares";

import userModule from "./user";
const router = Router();
router.use("/", labSecure, labRoutes);

router.use("/user", userModule);

export default router;

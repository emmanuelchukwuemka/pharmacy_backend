import { Router } from "express";
import * as labControllers from "./lab.controllers";

const router = Router();
router.post("/", labControllers.sample);
router.post("/create-lab-report", labControllers.createLabReport);

export default router;

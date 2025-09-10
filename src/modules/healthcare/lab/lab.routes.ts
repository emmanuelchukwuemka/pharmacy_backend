import { Router } from "express";
import * as labControllers from "./lab.controllers";

const router = Router();
router.post("/", labControllers.sample);
router.post("/create-lab-report", labControllers.createLabReport);
router.post("/create-lab-test", labControllers.createLabTest);
router.post("/add-test-panel-component", labControllers.addTestPanelComponent);

export default router;

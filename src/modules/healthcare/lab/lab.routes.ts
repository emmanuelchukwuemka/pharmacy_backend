import { Router } from "express";
import * as labControllers from "./lab.controllers";

const router = Router();
router.post("/", labControllers.sample);

export default router;

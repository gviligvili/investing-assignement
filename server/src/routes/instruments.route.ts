import express from "express";
import {
    createInstrumentController,
    getInstrumentsController,
    putInstrumentController
} from "../controllers/instruments.controller";

const router = express.Router();

router.get("/", getInstrumentsController);
router.post("/", createInstrumentController)
router.delete("/:id", putInstrumentController)
export const RanksRoutes = router;

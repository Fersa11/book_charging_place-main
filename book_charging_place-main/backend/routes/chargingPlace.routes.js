import express from "express";

import {
  getChargingPlaces,
  createChargingPlace,
  updateChargingPlace,
  deleteChargingPlace
} from "../controllers/charginPlace.controller.js";

const router = express.Router();

router.get("/", getChargingPlaces);
router.post("/", createChargingPlace);
router.put("/:id", updateChargingPlace);
router.delete("/:id", deleteChargingPlace);

export default router;

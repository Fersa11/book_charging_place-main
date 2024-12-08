import mongoose from "mongoose";
import ChargingPlace from "../models/chargingPlace.models.js";

export const getChargingPlaces = async (req, res) => {
  try {
    const chargingPlaces = await ChargingPlace.find({});
    // res.send(chargingPlaces);
    res.status(200).json({ success: true, data: chargingPlaces });
  } catch (error) {
    console.log("error in fetching slots:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createChargingPlace = async (req, res) => {
  const postChargingPlace = req.body;

  if (!postChargingPlace.driver || !postChargingPlace.occupied) {
    return res.status(400).json({
      success: false,
      message: `please provide all data`
    });
  }
  const newStatusChargingPlace = new ChargingPlace(postChargingPlace);
  try {
    await newStatusChargingPlace.save();
    res.status(201).json({ success: true, data: postChargingPlace });
  } catch (error) {
    console.log("Erros in slot", error.message);
    res.statusCode.json({ success: false, message: "Server error" });
  }
};

export const updateChargingPlace = async (req, res) => {
  const { id } = req.params;
  try {
    const updateParameter = req.body;
    const updatedPlace = await ChargingPlace.findByIdAndUpdate(
      id,
      updateParameter,
      { new: true }
    );
    res.status(200).json({ success: true, data: updatedPlace });
  } catch (error) {
    res.status(404).json({ success: false, message: "no success" });
  }
};

export const deleteChargingPlace = async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "invalid Id" });
  }
  try {
    await ChargingPlace.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "slot deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

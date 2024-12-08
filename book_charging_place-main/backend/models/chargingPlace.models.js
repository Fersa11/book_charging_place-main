import mongoose from "mongoose";

const chargingPlaceSchema = mongoose.Schema(
  {
    driver: {
      type: String,
      required: true
    },
    occupied: {
      type: Boolean,
      required: true
    },
    name: {
      type: String,
      required: false
    }
  },
  {
    timestamp: true //created@, updated@
  }
);

const ChargingPlace = mongoose.model("ChargingPlaces", chargingPlaceSchema);

export default ChargingPlace;

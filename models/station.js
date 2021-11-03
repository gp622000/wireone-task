const Joi = require("joi");
const mongoose = require("mongoose");

const stationSchema = mongoose.Schema({
  stationName: {
    type: String,
    required: true,
  },
  stationCode: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});

function validateStation(station) {
  const schema = Joi.object({
    stationName: Joi.string().min(1).required(),
    stationCode: Joi.number().min(1).required(),
    latitude: Joi.number().min(1).required(),
    longitude: Joi.number().min(1).required(),
    city: Joi.string().min(1).required(),
  });
  return schema.validate(station);
}

const Station = mongoose.model("Station", stationSchema);

exports.Station = Station;
exports.validate = validateStation;

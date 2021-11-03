const Joi = require("joi");
const mongoose = require("mongoose");

const vechicleSchema = mongoose.Schema({
  vechicleRegNo: {
    type: Number,
    required: true,
  },
  vechicleModel: {
    type: String,
    required: true,
  },
  currentStation: {
    type: String,
    required: true,
  },
  odometerReading: {
    type: Number,
    required: true,
  },
  fuelLevel: {
    type: Number,
    required: true,
  },
});

function validateVechicle(vechicle) {
  const schema = Joi.object({
    currentStation: Joi.string().min(1).required(),
    vechicleModel: Joi.string().min(1).required(),
    vechicleRegNo: Joi.number().min(1).required(),
    odometerReading: Joi.number().min(1).required(),
    fuelLevel: Joi.number().min(1).required(),
  });
  return schema.validate(vechicle);
}

const Vechicle = mongoose.model("Vechicle", vechicleSchema);

exports.Vechicle = Vechicle;
exports.validate = validateVechicle;

const express = require("express");
const { Vechicle, validate } = require("../models/vechicle");
const router = express.Router();

router.get("/", async (req, res) => {
  const vechicle = await Vechicle.find();
  res.send(vechicle);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);
  const vechicle = new Vechicle({
    vechicleRegNo: req.body.vechicleRegNo,
    vechicleModel: req.body.vechicleModel,
    currentStation: req.body.currentStation,
    odometerReading: req.body.odometerReading,
    fuelLevel: req.body.fuelLevel,
  });

  await vechicle.save();
  res.send(vechicle);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const vechicle = await Vechicle.findByIdAndUpdate(
    req.params.id,
    {
      vechicleRegNo: req.body.vechicleRegNo,
      vechicleModel: req.body.vechicleModel,
      currentStation: req.body.currentStation,
      odometerReading: req.body.odometerReading,
      fuelLevel: req.body.fuelLevel,
    },
    {
      new: true,
    }
  );

  if (!vechicle) {
    return res.status(404).send("The vechicle with the give ID was not found");
  }
  res.send(vechicle);
});

router.delete("/:id", async (req, res) => {
  const vechicle = await Vechicle.findByIdAndRemove(req.params.id);
  if (!vechicle)
    return res
      .status(404)
      .send("The vechicle with the given ID was not found.");

  res.send(vechicle);
});

module.exports = router;

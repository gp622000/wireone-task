const express = require("express");
const { Station, validate } = require("../models/station");
const router = express.Router();

router.get("/", async (req, res) => {
  const station = await Station.find();
  res.send(station);
});

router.post("/", async (req, res) => {
  const station = new Station({
    stationName: req.body.stationName,
    stationCode: req.body.stationCode,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    city: req.body.city,
  });

  await station.save();
  res.send(station);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const station = await Station.findByIdAndUpdate(
    req.params.id,
    {
      stationName: req.body.stationName,
      stationCode: req.body.stationCode,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      city: req.body.city,
    },
    {
      new: true,
    }
  );

  if (!station) {
    return res.status(404).send("The Station with the give ID was not found");
  }
  res.send(station);
});

router.delete("/:id", async (req, res) => {
  const station = await Station.findByIdAndRemove(req.params.id);
  if (!station)
    return res.status(404).send("The Station with the given ID was not found.");

  res.send(station);
});

module.exports = router;

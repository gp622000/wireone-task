const vechicle = require("./routes/vechicle");
const station = require("./routes/station");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use("/api/vechicle", vechicle);
app.use("/api/station", station);

mongoose
  .connect("mongodb://localhost/wireone")
  .then(() => console.log("Connected to database successfully"))
  .catch((err) => console.log(err.message));

const port = 8000;
app.listen(port, (req, res) => {
  console.log(`Server is running on ${port}`);
});

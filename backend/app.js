require("dotenv").config();
const express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");

const DB_URI = process.env.DB_URL;

const app = express();
const PORT = process.env.DB_Port;
const mainRoute = require("./routes/userCredit.routes");

mongoose
  .connect(DB_URI)
  .then(() => console.log("Connected to DB at", DB_URI))
  .catch((error) => console.log("Failed to connect to DB\n", error));

app.use(cors());
app.use(express.json());
app.use("/api", mainRoute);

app.listen(PORT, () => {
  console.log("Server Listening at", PORT);
});

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

//connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error : ", err));

//Routes
app.get("/", (req, res) => {
  res.send("API is running");
});

//start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is runnig on port ${PORT}`));

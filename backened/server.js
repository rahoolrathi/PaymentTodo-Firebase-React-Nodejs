const express = require("express");
const API = require("./api");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT | 3001;
const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,PUT,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors());
app.use(express.json());

new API(app).registerGroups();

app.listen(3001, () => console.log(`Server port ${PORT}`));

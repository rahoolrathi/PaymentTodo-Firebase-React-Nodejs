const express = require("express");
const http = require("http");
const API = require("./api");
require("dotenv").config();
const PORT = process.env.PORT;
const app = express();

app.use(express.json());

new API(app).registerGroups();

app.listen(3000, () => console.log(`Server port ${PORT}`));

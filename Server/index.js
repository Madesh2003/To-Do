const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const env = require('dotenv');
const { databaseconnect } = require("./db.config")

const app = express();
env.config();
databaseconnect();

app.use(cors());
app.use(bodyParser.json());

app.use('/todos',require('./Router/TodoRouter'));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
});

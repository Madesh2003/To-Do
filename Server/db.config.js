const mongoose = require("mongoose");
const env = require("dotenv")

env.config();

async function databaseconnect(){
    await mongoose.connect(`${process.env.mongodburi}${process.env.databasename}`)
    .then(() => console.log("db connected"))
    .catch((err) => console.log(err))
}

module.exports = {databaseconnect}
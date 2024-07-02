const mongoose = require("mongoose")

async function databaseconnect(){
    await mongoose.connect("mongodb://localhost:27017/Todos")
    .then(() => console.log("db connected"))
    .catch((err) => console.log(err))
}

module.exports = {databaseconnect}
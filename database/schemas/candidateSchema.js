const mongoose = require("mongoose");


const candidateSchema = new mongoose.Schema({
    candName:String,
    candContact:Number,
    candemail:String,
    nominatingElectionID:String,
})

module.exports = mongoose.model("candidateSchema", candidateSchema);
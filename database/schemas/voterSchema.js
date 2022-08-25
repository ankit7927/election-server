const mongoose = require("mongoose");

const voterSchema = new mongoose.Schema({
    name: String,
    email: String,
    contact: Number,
    username: {
        type: String,
        unique: true,
        requred: true
    },
    password: {
        type: String,
        requred: true
    },

    // id details
    birthDate: Date,
    address: String,
    state: String,
    adharNo: Number,
    panNo: String,
    voterCard: String,
    voteValue: [
        {
            eletionID: {
                type: String,
                default: null
            }
        }
    ]
})

module.exports = mongoose.model("voterSchema", voterSchema);
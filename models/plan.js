const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    credits: {
        type: String
    }
}, {timestamps: true});

module.exports = mongoose.model("Plan", planSchema);
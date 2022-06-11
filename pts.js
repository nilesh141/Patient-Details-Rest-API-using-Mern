const express = require("express");
const mongoose = require("mongoose");
const patientSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true

    },
    age: {
        type: Number,
        required: true,
        trim: true

    },
    address: {
        type: String,
        required: true,
        trim: true

    },
    phone_no: {
        type: Number,
        required: true,
        trim: true,
        unique: true

    },

    test_result: {
        type: Boolean,
        required: true,
        trim: true

    },
})

const CovidPtns = new mongoose.model("CovidPtns", patientSchema)
module.exports = CovidPtns;

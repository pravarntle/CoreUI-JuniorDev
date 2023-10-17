const { json } = require("express");
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const SchemaData = new schema({
    filename: {
        type: String,
        required: false,
    },
    filetype: {
        type: String,
        required: false
    },
    image: {
        type: Buffer,
        required: false
    }
}, {
    timestamps: {
        createdAt: "CREATED_AT",
        updatedAt: "UPDATED_AT"
    },
});

const stts_files = mongoose.model("stts_files", SchemaData, "stts_files");
module.exports = stts_files;
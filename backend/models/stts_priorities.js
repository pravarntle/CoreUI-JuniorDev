const { json } = require("express");
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const SchemaData = new schema({
    pri_name_eng: {
        type: String,
        required: true,
    },
    pri_name_th: {
        type: String,
        required: true,
    },
    pri_level: {
        type: String,
        required: true,
    },
    pri_status: {
        type: String,
        required: false,
    },
    pri_color: {
        type: String,
        required: false,
    },
    pri_description: {
        type: String,
        required: false,
    },
}, {
    timestamps: {
        createdAt: "CREATED_AT",
        updatedAt: "UPDATED_AT"
    },
});

const stts_priorities = mongoose.model("stts_priorities", SchemaData, "stts_priorities");
module.exports = stts_priorities;
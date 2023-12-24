const { json } = require("express");
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const SchemaData = new schema({
    mod_status: {
        type: String,
        required: true,
    },
    mod_date: {
        type: String,
        required: true,
    },
    mod_tkt: {
        type: String,
        required: true,
    },
    mod_act: {
        type: schema.Types.ObjectId,
        ref: "stts_accounts",
        required: true,
    },
    mod_tkt: {
        type: schema.Types.ObjectId,
        ref: "stts_tickets",
        required: true,
    },
}, {
    timestamps: {
        createdAt: "CREATED_AT",
        updatedAt: "UPDATED_AT"
    },
});

const stts_files = mongoose.model("stts_modifications", SchemaData, "stts_modifications");
module.exports = stts_files;
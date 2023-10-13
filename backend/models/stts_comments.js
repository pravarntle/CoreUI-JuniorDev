const { json } = require("express");
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const SchemaData = new schema({
    cmt_message: {
        type: String,
        required: false,
    },
    cmt_link: {
        type: String,
        required: false,
    },
    cmt_picture: {
        type: Buffer,
        required: false,
    },
    cmt_file: {
        type: Buffer,
        required: false,
    },
    cmt_date: {
        type: String,
        required: false,
    },
    cmt_act: {
        type: schema.Types.ObjectId,
        ref: "stts_accounts",
        required: false
    },
    cmt_tkt: {
        type: schema.Types.ObjectId,
        ref: "stts_tickets",
        required: true
    },
}, {
    timestamps: {
        createdAt: "CREATED_AT",
        updatedAt: "UPDATED_AT"
    },
});

const stts_comments = mongoose.model("stts_comments", SchemaData, "stts_comments");
module.exports = stts_comments;
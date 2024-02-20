const { json } = require("express");
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const SchemaData = new schema({
    not_datetime: {
        type: String,
        required: true,
    },
    not_status: {
        type: Boolean,
        required: true,
    },
    not_type: {
        type: String,
        required: true,
    },
    not_act: {
        type: schema.Types.ObjectId,
        ref: "stts_accounts",
        required: true,
    },
    not_tkt: {
        type: schema.Types.ObjectId,
        ref: "stts_tickets",
        required: false,
    },
    not_cmt: {
        type: schema.Types.ObjectId,
        ref: "stts_comments",
        required: true,
    },
    not_acc: {
        type: schema.Types.ObjectId,
        ref: "stts_accept_tickets",
        required: false,
    },
    //notย่อมาจาก notifications
}, {
    timestamps: {
        createdAt: "CREATED_AT",
        updatedAt: "UPDATED_AT"
    },
});

const stts_files = mongoose.model("stts_notifications", SchemaData, "stts_notifications");
module.exports = stts_files;
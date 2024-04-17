const mongoose = require("mongoose");

const accountLineSchema = new mongoose.Schema({
    label: {type: String},
    type: {type: String},
    amount: {type: Number},
    date: {type: Date},
    method: {type: String},
    isPassed: {type: Boolean},
    category: {type: String},
    account: {type: String},
    lastUpdated: {type: Date}
});

const AccountLine = mongoose.model("AccountLine", accountLineSchema);

module.exports = AccountLine;
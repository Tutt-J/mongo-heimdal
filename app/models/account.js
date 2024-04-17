const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    bankName: {type: String},
    customName: {type: String},
    user: {type: String},
    lastUpdated: {type: Date}
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
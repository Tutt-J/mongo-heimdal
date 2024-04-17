const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    bankName: {
        type: String,
        trim: true,
        required: [true, "Bank name is required."]
    },
    customName: {
        type: String,
        trim: true,
        maxlength: [50, "Custom name must be at most 50 characters long."],
        required: [true, "Custom name is required."]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "UserId is required."]
    },
    lastUpdated: {
        type: Date,
        required: [true, "Last Updated is required"]
    }
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
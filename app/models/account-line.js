const mongoose = require("mongoose");

const accountLineSchema = new mongoose.Schema({
  label: {
    type: String,
    required: [true, "Label is required."],
    maxlength: [50, "Label must be at most 50 characters long."],
    minlength: [2, "Label must be at least 2 characters long."],
    trim: true,
  },
  type: {
    type: String,
    required: [true, "Type is required"],
    enum: {
      values: ["credit", "debit"],
      message: "{VALUE} is not a valid option. Type must be credit or debit.",
    },
  },
  amount: {
    type: Number,
    required: [true, "Amount is required."],
    validate: {
      validator: function (amount) {
        return amount > 0;
      },
      message: "Amount can't be 0.",
    },
  },
  date: {
    type: Date,
    required: [true, "Date is required."],
  },
  method: {
    type: String,
    required: [true, "Method is required."],
    enum: {
      values: ["Cash", "Direct Deposit", "Credit Card", "Bank Transfer"],
      message:
        '{VALUE} is not a valid option. Value must be "Cash", "Direct Deposit", "Credit Card" or "Bank Transfer".',
    },
  },
  isPassed: {
    type: Boolean,
    default: false,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "CategoryId is required."],
  },
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: [true, "AccountId is required."],
  },
  lastUpdated: {
    type: Date
  },
});

accountLineSchema.pre("save", function (next) {
  this.lastUpdated = Date.now();
  next();
});

accountLineSchema.pre("findOneAndUpdate", function (next) {
  this.set({ lastUpdated: Date.now() });
  next();
});

const AccountLine = mongoose.model("AccountLine", accountLineSchema);

module.exports = AccountLine;

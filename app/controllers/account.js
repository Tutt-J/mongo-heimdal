const Account = require("../models/account.js");

exports.readAll = async (req, res) => {
  try {
    const accounts = await Account.find({ userId: req.auth.userId });
    res.status(200).json(accounts);
  } catch (err) {
    return res.status(500).json({
      error: err.message || "Some error occurred while retrieving accounts.",
    });
  }
};

exports.create = async (req, res) => {
  try {
    const { bankName, customName } = req.body;
    const account = new Account({
      bankName,
      customName,
      userId: req.auth.userId,
    });
    await account.save();
    res.status(201).json(account);
  } catch (err) {
    return res.status(500).json({
      error: err.message || "Some error occurred while creating account.",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { bankName, customName } = req.body;
    const account = await Account.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.auth.userId,
      },
      {
        bankName,
        customName,
      },
      {
        returnDocument: "after",
      }
    );

    if (!account) {
      return res.status(404).json({ message: "Account not found." });
    }

    res.status(200).json(account);
  } catch (err) {
    return res.status(500).json({
      error: err.message || "Some error occurred while updating account.",
    });
  }
};

exports.delete = (req, res) => {
  res.send("Welcome to account delete");
};

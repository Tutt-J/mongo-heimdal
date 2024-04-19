const Account = require("../models/account.js");
const mongoose = require("mongoose");

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
exports.getBalance = async (req, res) => {
  try {
    const result = await Account.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId.createFromHexString(req.auth.userId),
        },
      },
      {
        $lookup: {
          from: "accountlines",
          localField: "_id",
          foreignField: "accountId",
          as: "accountLine",
        },
      },
      {
        $unwind: "$accountLine",
      },
      {
        $group: {
          _id: "$_id",
          balance: {
            $sum: {
              $cond: {
                if: { $eq: ["$accountLine.type", "credit"] },
                then: "$accountLine.amount",
                else: { $multiply: ["$accountLine.amount", -1] },
              },
            },
          },
        },
      },
      {
        $group: {
          _id: null,
          totalBalance: { $sum: "$balance" },
        },
      },
      {
        $project: {
          _id: 0
        }
      }
    ]);

    res.json(result);
  } catch (err) {
    return res.status(500).json({
      error: err.message || "Some error occurred while calculating balance.",
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

exports.delete = async (req, res) => {
  try {
    const account = await Account.findOneAndDelete({
      _id: req.params.id,
      userId: req.auth.userId,
    });

    if (!account) {
      return res.status(404).json({ message: "Accound not found." });
    }

    res.status(204).send();
  } catch (err) {
    return res.status(500).json({
      error: err.message || "Some error occurred while deleting account.",
    });
  }
};

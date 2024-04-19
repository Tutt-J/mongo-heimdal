const AccountLine = require("../models/account-line.js");
const mongoose = require("mongoose");
const Account = require("../models/account.js");

const checkUserAccess = async (match, userId) => {
  try {
    const lines = await AccountLine.aggregate([
      {
        $match: match,
      },
      {
        $lookup: {
          from: "accounts",
          localField: "accountId",
          foreignField: "_id",
          as: "accountDetails",
        },
      },
      {
        $unwind: "$accountDetails",
      },
      {
        $match: {
          "accountDetails.userId":
            mongoose.Types.ObjectId.createFromHexString(userId),
        },
      },
      {
        $project: {
          accountDetails: 0,
        },
      },
    ]);

    if (lines.length === 0) {
      return false;
    }
    return lines;
  } catch (err) {
    return false;
  }
};

exports.readAllByAccount = async (req, res) => {
  try {
    const lines = await checkUserAccess(
      {
        accountId: mongoose.Types.ObjectId.createFromHexString(
          req.params.accountId
        ),
      },
      req.auth.userId
    );

    if (!lines) {
      return res.status(404).json({ message: "Aucune ligne récupérable." });
    }

    res.status(200).json(lines);
  } catch (err) {
    return res.status(500).json({
      error:
        err.message || "Some error occurred while retrieving lines by account.",
    });
  }
};

exports.readAllByAccountWithDetails = async (req, res) => {
  try {
    const lines = await AccountLine.find({ accountId: req.params.accountId })
      .populate("accountId");
    res.status(200).json(lines);
  } catch (err) {
    return res.status(500).json({
      error:
        err.message || "Some error occurred while retrieving lines by account.",
    });
  }
};

exports.create = async (req, res) => {
  try {
    const account = Account.findOne({
      _id: req.params.accountId,
      userId: req.auth.userId,
    });

    if (!account) {
      return res.status(404).json({ message: "Account not found." });
    }

    const { label, type, amount, date, method, categoryId } = req.body;
    const accountLine = new AccountLine({
      label,
      type,
      amount,
      date,
      method,
      categoryId,
      accountId: req.params.accountId,
    });
    await accountLine.save();
    res.status(201).json(accountLine);
  } catch (err) {
    return res.status(500).json({
      error:
        err.message || "Some error occurred while creating lines by account.",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const line = await checkUserAccess(
      {
        _id: mongoose.Types.ObjectId.createFromHexString(req.params.id),
      },
      req.auth.userId
    );

    if (!line) {
      return res
        .status(403)
        .json({ message: "This is not your account line." });
    }

    const { label, type, amount, date, method, categoryId } = req.body;
    const accountLine = await AccountLine.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        label,
        type,
        amount,
        date,
        method,
        categoryId,
      },
      {
        returnDocument: "after",
      }
    );

    if (!accountLine) {
      return res.status(404).json({ message: "Account Line not found." });
    }
    res.status(200).json(accountLine);
  } catch (err) {
    return res.status(500).json({
      error: err.message || "Some error occurred while updating line.",
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const line = await checkUserAccess(
      {
        _id: mongoose.Types.ObjectId.createFromHexString(req.params.id),
      },
      req.auth.userId
    );

    if (!line) {
      return res
        .status(403)
        .json({ message: "This is not yout account line." });
    }

    const accountLine = await AccountLine.findOneAndDelete({
      _id: req.params.id,
    });

    if (!accountLine) {
      return res.status(404).json({ message: "Account Line not found." });
    }

    res.status(204).send();
  } catch (err) {
    return res.status(500).json({
      error: err.message || "Some error occurred while deleting line.",
    });
  }
};

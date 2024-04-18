const express = require("express");
const userRoutes = require("./user.js");
const accountRoutes = require("./account.js");
const accountLineRoute = require('./account-line.js');

const router = express();

router.use("/auth", userRoutes);
router.use('/account', accountRoutes);
router.use("/line", accountLineRoute);

module.exports = router;

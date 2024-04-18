const express = require("express");
const router = express();

const accountLineCtrl = require("../controllers/account-line.js");

router.get("/:accountId", accountLineCtrl.readAllByAccount);
router.post("/:accountId", accountLineCtrl.create);
router.put("/:id", accountLineCtrl.update);
router.delete("/:id", accountLineCtrl.delete);

module.exports = router;
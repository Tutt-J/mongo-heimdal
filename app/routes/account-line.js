const express = require("express");
const router = express();
const auth = require("../middlewares/auth.js");
const accountLineCtrl = require("../controllers/account-line.js");

router.get("/:accountId", auth, accountLineCtrl.readAllByAccount);
router.get("/:accountId/details", auth, accountLineCtrl.readAllByAccountWithDetails);
router.post("/:accountId", auth, accountLineCtrl.create);
router.put("/:id", auth, accountLineCtrl.update);
router.delete("/:id", auth, accountLineCtrl.delete);

module.exports = router;
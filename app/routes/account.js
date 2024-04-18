const express = require("express");
const router = express();

const accountCtrl = require("../controllers/account.js");

router.get("/", accountCtrl.readAll);
router.post("/", accountCtrl.create);
router.put("/:id", accountCtrl.update);
router.delete("/:id", accountCtrl.delete);

module.exports = router;
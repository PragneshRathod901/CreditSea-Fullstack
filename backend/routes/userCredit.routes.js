const router = require("express").Router();
const {
  saveUserCredit,
  getUserCredit,
} = require("../controllers/userCredit.controller");

router.post("/upload", saveUserCredit);
router.get("/:reportId", getUserCredit);

module.exports = router;

const express = require("express");
const router = express.Router();

const {getAllMessages,getMessageUser,createContactus} = require("../controllers/contactus.controller");
const {authenticate} = require("../middelwares/auth.middelware");
const {authorize} = require("../middelwares/role.middelware");


router.get("/",authenticate,authorize("admin"),getAllMessages);
router.get("/:id",authenticate, authorize("admin"),getMessageUser);
router.post("/",authenticate, authorize("user"),createContactus);

module.exports = router;
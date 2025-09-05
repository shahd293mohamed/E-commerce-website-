const express = require("express");
const router = express.Router();

const {getBrandSocial,addBrandSocial,updateBrandSocial}=require("../controllers/web-sett.controller");



router.get("/",getBrandSocial);
router.post("/",addBrandSocial);
router.put("/:id",updateBrandSocial);

module.exports = router;
const express = require("express");
const router = express.Router();

const {addtoFavourite,getFavouriteByUser,removeFromFavourite} = require("../controllers/favourite.controller");
const {authenticate} = require("../middelwares/auth.middelware");

router.get("/",authenticate,getFavouriteByUser);
router.post("/",authenticate,addtoFavourite);
router.delete("/:id",authenticate,removeFromFavourite);

module.exports = router;
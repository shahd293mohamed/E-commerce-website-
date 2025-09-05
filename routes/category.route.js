const express = require("express");
const router = express.Router();

const {getAllCategories,getCategoriesTree,getCategory,createCategory,deleteCategory} = require("../controllers/category.controller");
const {authorize} = require("../middelwares/role.middelware");
const {authenticate} = require("../middelwares/auth.middelware");

router.get("/",getAllCategories);
router.get("/tree",getCategoriesTree);
router.get("/:id",getCategory);
router.post("/",authenticate,authorize("admin"),createCategory);
router.delete("/:id",deleteCategory);    

module.exports = router;
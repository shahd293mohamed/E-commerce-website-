const express = require("express");
const router = express.Router();
const upload = require("../middelwares/uploads.middelware");

const {getAllProducts,getProductByRoute,addProduct,getRelatedProducts,getproductByCategoryId,getProductsByCategory,updateProduct}= require("../controllers/product.controller");
const {authenticate} = require("../middelwares/auth.middelware");
const {authorize} = require("../middelwares/role.middelware");

router.get("/categories", getProductsByCategory);
router.get("/",getAllProducts);

// router.get("/related/:category",getRelatedProducts);

// router.get("/category/:id", getproductByCategoryId);


router.post("/",authenticate, authorize("admin"),upload.single("img") ,addProduct);
router.get("/:route",getProductByRoute);
router.put('/update/:id',authenticate, authorize("admin"),upload.single("img"),updateProduct);

module.exports = router;
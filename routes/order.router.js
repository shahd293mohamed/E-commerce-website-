const express = require("express");
const router = express.Router();

const {createOrder,getOrderById,getAllOrders,updateOrderStatus, getorderByUserId}=require("../controllers/order.controller");
const {authenticate} = require("../middelwares/auth.middelware");
const {authorize} = require("../middelwares/role.middelware");
const {getSalesReport}=require("../controllers/report.controller");




router.post("/",authenticate,authorize ("user"),createOrder);
router.get("/",authenticate,getAllOrders);
router.get('/report',authenticate,authorize("admin") ,getSalesReport)
router.get("/:id",authenticate,getOrderById);
router.get("/user/:id",authenticate, authorize("user"),getorderByUserId);
router.put("/:id",authenticate,authorize("admin"),updateOrderStatus);



module.exports=router;
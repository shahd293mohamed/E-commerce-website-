const express=require("express");
const router=express.Router();


const {getAllUsers,getUser,createUser,updateUser}=require("../controllers/user.controller");
const {login,signup}=require("../controllers/auth.controller");
const {authenticate}=require("../middelwares/auth.middelware");
const {authorize}=require("../middelwares/role.middelware");


router.get("/",authenticate,authorize("admin"),getAllUsers);
router.post("/signup",createUser("user"));
router.get("/:id",authenticate,authorize("admin"),getUser);

router.put("/:id", authenticate,authorize,updateUser);
router.post("/login", login);


module.exports=router;
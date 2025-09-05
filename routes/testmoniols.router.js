const exoress=require("express");
const router=exoress.Router();

const {getAllTestmoniols,getAllTestmoniolsByUser,getApprovedTestmoniols,getUnseenTestmoniols,createTestmoniols,approvedTestmoniolByAdmin,deleteTestmoniolByAdmin}=require("../controllers/testmoniols.controller");

router.get("/",getAllTestmoniols);
router.get("/user/:id",getAllTestmoniolsByUser);
router.get("/approved",getApprovedTestmoniols);
router.get("/unseen",getUnseenTestmoniols);
router.post("/",createTestmoniols);
router.put("/approved/:id",approvedTestmoniolByAdmin);
router.delete("/:id",deleteTestmoniolByAdmin);

module.exports=router;
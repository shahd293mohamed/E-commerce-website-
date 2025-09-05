const Testmoniols=require("../models/testmoniols.model");

exports.getAllTestmoniols=async(req,res)=>{
    try {
        const testmoniols=await Testmoniols.find();
        res.status(200).json({message:"all testmoniols",testmoniols});
    } catch (error) {
        res.status(500).json({message:"error in getting testmoniols",error});
    }
}
exports.getAllTestmoniolsByUser=async(req,res)=>{
    try {
        const testmoniols=await Testmoniols.find({user:req.params.id});
        res.status(200).json({message:"all testmoniols",testmoniols});
    } catch (error) {
        res.status(500).json({message:"error in getting testmoniols",error});
    }
}
exports.getApprovedTestmoniols=async(req,res)=>{
    try {
        const testmoniols=await Testmoniols.find({isApproved:true});
        res.status(200).json({message:"all testmoniols",testmoniols});
    } catch (error) {
        res.status(500).json({message:"error in getting testmoniols",error});
    }
}

exports.getUnseenTestmoniols=async(req,res)=>{
    try {
        const testmoniols=await Testmoniols.find({isSeen:false});
        res.status(200).json({message:"all testmoniols",testmoniols});
    } catch (error) {
        res.status(500).json({message:"error in getting testmoniols",error});
    }
}

exports.createTestmoniols=async(req,res)=>{
    try {
        const {user,email,message}=req.body;
        const testmoniols=await Testmoniols.create({user,email,message});
        res.status(201).json({message:"testmoniols created waiting for approval by Admin",testmoniols});
    } catch (error) {
        res.status(500).json({message:"error in creating testmoniols",error});
    }
}

exports.approvedTestmoniolByAdmin=async(req,res)=>{
    try {
        const testmoniols=await Testmoniols.findByIdAndUpdate(req.params.id,{isApproved:true},{new:true});
        res.status(200).json({message:"testmoniols approved",testmoniols});
    } catch (error) {
        res.status(500).json({message:"error in approving testmoniols",error});
    }
}

exports.deleteTestmoniolByAdmin=async(req,res)=>{
    try {
        const testmoniols=await Testmoniols.findByIdAndUpdate(req.params.id,{isDeleted:true},{new:true});
        res.status(200).json({message:"testmoniols deleted",testmoniols});
    } catch (error) {
        res.status(500).json({message:"error in deleting testmoniols",error});
    }
}



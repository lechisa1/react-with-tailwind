const express=require('express')

const router=express.Router();
const loginController=require('../../controller/LoginController')
router.post("/login",loginController.login);
router.post("/logout",loginController.logout)

module.exports=router
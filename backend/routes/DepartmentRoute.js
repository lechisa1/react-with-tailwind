const express= require('express');
const router=express.Router();
const DepartmentController=require('../controller/department/DepartmentController');
const { authenticateToken } = require('../middleware/loginMiddleware');
router.post('/register',authenticateToken, DepartmentController.registerDepartment)
router.get('/', DepartmentController.getAllDepartments);
router.put("/:id", DepartmentController.updateDepartment);

router.delete("/:id", DepartmentController.softDeleteDepartment);
router.delete("/permanent/:id", DepartmentController.permanentDepartmentDelete);
router.get("/soft-deleted", DepartmentController.softlyDeletedDepartments);
router.get("/:id", DepartmentController.getDepartmentById);

module.exports=router; 
const express = require("express");

const userController = require("../Controller/useController");
const projectController= require("../Controller/projectController");

const multerConfig = require("../Middlewares/projectMiddleware");
const jwtmiddleware = require("../Middlewares/jwtMiddleware")
const router = new express.Router();

router.post("/user/register", userController.register);
router.post("/user/login", userController.login);
router.post("/project/addproject",jwtmiddleware,multerConfig.single('project_image'),projectController.addProjects)
router.get("/user/projectlist",jwtmiddleware,userController.userProjects)
router.get("/home/projects",userController.homeProjects)
router.get("/project/projects",jwtmiddleware,userController.allProjects)
router.put("/user/editProject/:id",jwtmiddleware,multerConfig.single('project_image'),userController.editProject)
router.delete("/user/deleteproject/:id",jwtmiddleware,userController.deleteProject)
router.put('/user/updateprofile/:id',jwtmiddleware,multerConfig.single('image'),userController.profileUpdate)

module.exports = router;

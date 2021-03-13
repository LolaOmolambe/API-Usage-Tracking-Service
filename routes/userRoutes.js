const express = require("express");
const userController = require("../controllers/user");
const authController = require("../controllers/auth");
const router = express.Router();

router.use(authController.protectRoutes, authController.restrictTo("admin"));

router.get("/", userController.getAllUsers);
router.get("/deactivateuser/:id", userController.deactivateUser);
router.get("/reactivateuser/:id", userController.activateUser);

router.get("/:id", userController.getUser);

module.exports = router;

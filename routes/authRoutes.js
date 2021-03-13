const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();
const middleware = require("../helpers/validationMiddleware");
const schemas = require("../helpers/validationSchema");

router.post("/signup", middleware(schemas.signUpModel), authController.signup);
router.post("/login", middleware(schemas.loginModel), authController.login);


module.exports = router;




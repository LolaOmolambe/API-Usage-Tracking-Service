const express = require("express");
const router = express.Router();
const ipController = require("../controllers/ipLookup");
const authController = require("../controllers/auth");

router.use(authController.protectRoutes);

router.get("/", ipController.iplookup);

module.exports = router;
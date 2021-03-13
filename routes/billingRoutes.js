const express = require("express");
const authController = require("../controllers/auth");
const billingController = require("../controllers/billing");
const router = express.Router();

router.use(authController.protectRoutes, authController.restrictTo("admin"));

router.route("/").get(billingController.getAllBillingData);
router.get("/user/:clientId", billingController.getBillingDataUser);
router.get("/daterange", billingController.getBillingDataByDate);

module.exports = router;

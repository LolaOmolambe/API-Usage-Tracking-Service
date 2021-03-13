const express = require("express");
const authRoutes = require("./authRoutes");
const ipRoutes = require("./ipRoutes");
const planRoutes = require("./planRoutes");
const billingRoutes = require("./billingRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/iplookup", ipRoutes);
router.use("/plan", planRoutes);
router.use("/billing", billingRoutes);

module.exports = router;
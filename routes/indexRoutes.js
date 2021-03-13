const express = require("express");
const authRoutes = require("./authRoutes");
const ipRoutes = require("./ipRoutes");
const planRoutes = require("./planRoutes");
const billingRoutes = require("./billingRoutes");
const userRoutes = require("./userRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/iplookup", ipRoutes);
router.use("/plan", planRoutes);
router.use("/billing", billingRoutes);
router.use("/user", userRoutes);

module.exports = router;
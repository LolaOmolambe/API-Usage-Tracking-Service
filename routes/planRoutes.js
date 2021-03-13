const express = require("express");
const authController = require("../controllers/auth");
const planController = require("../controllers/plan");
const router = express.Router();
const middleware = require("../helpers/validationMiddleware");
const schemas = require("../helpers/validationSchema");

router.use(authController.protectRoutes, authController.restrictTo("admin"));

router
  .route("/")
  .get(planController.getPlans)
  .post(middleware(schemas.planModel), planController.createPlan);

module.exports = router;

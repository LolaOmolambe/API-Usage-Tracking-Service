const Plan = require("../models/plan");
const { errorResponse, successResponse } = require("../helpers/responseBody");

exports.createPlan = async (req, res, next) => {
  try {
    let { name, price, credits } = req.body;

    price = parseFloat(price);

    let createdPlan = await new Plan({
      name,
      price,
      credits,
    }).save();

    return successResponse(res, 201, "Plan added successfully", createdPlan);
  } catch (err) {
    return errorResponse(res, 500, "Creating Plan failed", err);
  }
};

exports.getPlans = async (req, res, next) => {
  try {
    let plans = await Plan.find().sort({ createdAt: "descending" });

    return successResponse(res, 200, "Plans fetched successfully", plans);
  } catch (err) {
    return errorResponse(res, 500, "Fetching products failed!", err);
  }
};

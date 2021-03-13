const Billing = require("../models/billing");
const { errorResponse, successResponse } = require("../helpers/responseBody");
const queryHelpers = require("../helpers/queryHelper");

exports.getAllBillingData = async (req, res, next) => {
  try {
    let billingQuery = new queryHelpers(Billing.find(), req.query)
      .filter()
      .paginate();
    let billings = await billingQuery.query;

    return successResponse(
      res,
      200,
      "Billing Data fetched successfully",
      billings
    );
  } catch (err) {
    return errorResponse(res, 500, "Oops, Something went wrong", err);
  }
};

exports.getBillingDataByDate = async (req, res, next) => {
  try {
    let { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return errorResponse(
        res,
        400,
        "Enter both start date and end dates",
        null
      );
    }
    const billings = await Billing.find({
      createdAt: {
        $gte: new Date(new Date(startDate)),
        $lt: new Date(new Date(endDate)),
      },
    }).sort({ createdAt: "descending" });


    return successResponse(
      res,
      200,
      "Billing Data fetched successfully",
      billings
    );
  } catch (err) {
    return errorResponse(res, 500, "Oops, Something went wrong", err);
  }
};

exports.getBillingDataUser = async (req, res, next) => {
  try {
    let billing = await Billing.find({ clientId: req.params.clientId });
    return successResponse(
      res,
      200,
      "Billing Data fetched successfully",
      billing
    );
  } catch (err) {
    return errorResponse(res, 500, "Opps, Something went wrong", err);
  }
};

const { errorResponse, successResponse } = require("../helpers/responseBody");
const User = require("../models/user");

exports.iplookup = async (req, res, next) => {
  try {
    let user = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $inc: { "apiUsage.requestsThisMonth": 1 },
        "apiUsage.updatedAt": new Date().toISOString(),
      }
    );

    return successResponse(res, 200, "Welcome to IP Lookup Service, Thank you", null);
  } catch (err) {
    return errorResponse(res, 500, "Opps, Something went wrong", err);
  }
};

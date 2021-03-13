const User = require("./../models/user");
const queryHelpers = require("../helpers/queryHelper");
const { errorResponse, successResponse } = require("../helpers/responseBody");

exports.getAllUsers = async (req, res, next) => {
  try {
    let userQuery = new queryHelpers(User.find(), req.query)
      .filter()
      .paginate();
    let users = await userQuery.query;
    return successResponse(res, 200, "Users fetched successfully", users);
  } catch (err) {
    return errorResponse(res, 500, "Oops, Something went wrong", err);
  }
};

exports.deactivateUser = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { isActive: false });
    return successResponse(res, 200, "User deactivated successfully", null);
  } catch (err) {
    return errorResponse(res, 500, "Oops, Something went wrong", err);
  }
};

exports.activateUser = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { isActive: true });
    return successResponse(res, 200, "User activated successfully", null);
  } catch (err) {
    return errorResponse(res, 500, "Oops, Something went wrong", err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id);
    if (user) {
      return successResponse(res, 200, "User fetched successfully", user);
    } else {
      return errorResponse(res, 404, "Oops, Something went wrong", err);
    }
  } catch (err) {
    return errorResponse(res, 500, "Oops, Something went wrong", err);
  }
};

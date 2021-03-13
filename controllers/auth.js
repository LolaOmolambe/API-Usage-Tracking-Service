const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { errorResponse, successResponse } = require("../helpers/responseBody");

const signToken = (user) => {
  return jwt.sign(
    { email: user.email, userId: user._id },

    process.env.JWT_KEY,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

exports.signup = async (req, res, next) => {
  try {
    let date = new Date(); // Now
    let endDate = date.setDate(date.getDate() + 30);
    req.body.next_payment_date = endDate;
    req.body.start_payment_date = new Date();

    const newUser = await User.create(req.body);

    const token = signToken(newUser._id);
    newUser["password"] = undefined;

    return successResponse(res, 201, "Sign Up Successfull", { token, newUser });
  } catch (err) {
    return errorResponse(res, 500, "Sign Up not Sucessfull", err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //check if user exists and password is correct
    const user = await User.findOne({ email })
      .select("+password")
      .select("+isActive");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return errorResponse(res, 401, "Incorrect email or password", null);
    }
    if (user.isActive == false) {
      return errorResponse(res, 401, "Your Account has been deactivated", null);
    }

    const token = signToken(user);
    user["password"] = undefined;
    return successResponse(res, 200, "Login successful", { token, user });
  } catch (err) {
    return errorResponse(res, 500, "Opps, Something went wrong", err);
  }
};

exports.protectRoutes = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return errorResponse(res, 401, "You are not authenticated", null);
  }

  try {
    //Verify token
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    //Check if user still exists
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return errorResponse(
        res,
        401,
        "The user belonging to this token no longer exists",
        null
      );
    }

    req.user = user;
    next();
  } catch (err) {
    return errorResponse(res, 401, "Invalid token", err);
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return errorResponse(res, 403, "Not authorized to perform this action", null);
    }
    next();
  };
};


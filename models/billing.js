const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },
    requests: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

billingSchema.pre(/^find/, function(next) {
    this.populate('clientId').populate({
      path: 'planId',
      select: 'name'
    });
    next();
  });

module.exports = mongoose.model("Billing", billingSchema);

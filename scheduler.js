const cron = require("node-cron");
const User = require("./models/user");
const Plan = require("./models/plan");
const Billing = require("./models/billing");
const moment = require("moment");

const calculatePayment = async (user) => {
  let plan;
  let amountToBeBilled;
  if (user.apiUsage) {
    if (
      user.apiUsage.requestsThisMonth >= 0 &&
      user.apiUsage.requestsThisMonth <= 1000000
    ) {
      let number = Math.floor(user.apiUsage.requestsThisMonth / 1000);
      plan = await Plan.findOne({ name: "Basic" });
      amountToBeBilled = plan.price * number;
    } else if (
      user.apiUsage.requestsThisMonth >= 1000001 &&
      user.apiUsage.requestsThisMonth <= 10000000
    ) {
      let number = Math.floor(user.apiUsage.requestsThisMonth / 1000);
      plan = await Plan.findOne({ name: "Medium" });
      amountToBeBilled = plan.price * number;
    } else if (user.apiUsage.requestsThisMonth >= 10000001) {
      let number = Math.floor(user.apiUsage.requestsThisMonth / 1000);
      plan = await Plan.findOne({ name: "Large" });
      amountToBeBilled = plan.price * number;
    }
    return { plan, amountToBeBilled };
  }
};

//This scheduler runs every day at 11:59 PM
cron.schedule("59 23 * * *", async function (req, res, next) {
  let today = moment(new Date()).format("YYYY-MM-DD");
  let users = await User.find();

  if (users) {
    for (let i = 0; i <= users.length; i++) {
      let singleUser = users[i];
      let dueDate = moment(singleUser.next_payment_date).format("YYYY-MM-DD");

      if (today >= dueDate) {
        let user = await User.findById(singleUser._id);

        let { plan, amountToBeBilled } = await calculatePayment(user);

        //Add to Billing
        let billing = await new Billing({
          clientId: user._id,
          planId: plan._id,
          requests: user.apiUsage.requestsThisMonth,
          amount: amountToBeBilled,
          startDate: user.start_payment_date,
          endDate: user.next_payment_date,
        }).save();

        //Update User Document
        let newDate = new Date();
        let endDate = newDate.setDate(newDate.getDate() + 30);

        await User.updateOne(
          { _id: user._id },
          {
            next_payment_date: endDate,
            start_payment_date: new Date().toISOString(),
            "apiUsage.requestsThisMonth": 0,
            "apiUsage.updatedAt": new Date().toISOString(),
          }
        );
      }
    }
  }
});

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

const User = require("../models/user");
const Billing = require("../models/billing");

let newUser = {
  name: "Admin Test",
  email: "fakeadmin1@yahoo.com",
  role: "admin",
  password: "1234567",
  passwordConfirm: "1234567",
};

describe("Billing model Endpoints", () => {
  let token;

  beforeAll(async () => {
    await User(newUser).save();
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "testadmin@yahoo.com", password: "1234567" });
    token = response.body.data.token;
  });

  afterAll(async () => {
    await Billing.deleteMany({});
    await mongoose.connection.close();
  });

  it("should try to get all billings ", async () => {
    const res = await request(app)
      .get("/api/billing")
      .set({ Authorization: "Bearer " + token });

    expect(res.status).toEqual(200);
  });

  it("should try to get all billings without bearer token and fail", async () => {
    const res = await request(app).get("/api/billing");

    expect(res.status).toEqual(401);
  });
});

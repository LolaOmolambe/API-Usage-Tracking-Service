const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

const Plan = require("../models/plan");
const User = require("../models/user");

let testUser = {
  name: "Tester",
  email: "testadmin@yahoo.com",
  role: "admin",
  password: "1234567",
  passwordConfirm: "1234567",
};

describe("Plan model Endpoints", () => {
  let token;

  beforeAll(async () => {
    await User(testUser).save();
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "testadmin@yahoo.com", password: "1234567" });
    token = response.body.data.token;
  });

  afterAll(async () => {
    await Plan.deleteMany({});
    await mongoose.connection.close();
  });

  it("should try to create plan without bearer token and fail", async () => {
    const res = await request(app).post("/api/plan/").send({
      name: "Large",
      price: "3.5",
    });

    expect(res.status).toEqual(401);
  });
  it("should try to create plan with invalid payload and fail", async () => {
    const res = await request(app)
      .post("/api/plan/")
      .set({ Authorization: "Bearer " + token })
      .send();
    expect(res.status).toEqual(422);
  });

  it("should try to create plan with valid payload and pass", async () => {
    const res = await request(app)
      .post("/api/plan/")
      .set({ Authorization: "Bearer " + token })
      .send({
        name: "Large",
        price: "3.5",
      });
    expect(res.status).toEqual(201);
  });

  it("should try to get all plans", async () => {
    const res = await request(app)
      .get("/api/plan/")
      .set({ Authorization: "Bearer " + token });

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });

  it("should try to get all plans without bearer token", async () => {
    const res = await request(app).get("/api/plan/");

    expect(res.status).toEqual(401);
  });
});

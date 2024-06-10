const request = require("supertest");
const express = require("express");
const accountRouter = require("./routes/account");

const app = express();
app.use(express.json());
app.use("/api/account", accountRouter);

describe("GET /api/account/:id", () => {
  it("should return account details for valid id", (done) => {
    request(app)
      .get("/api/account/1")
      .expect(200)
      .expect((res) => {
        if (!res.body.id) throw new Error("Missing account data");
      })
      .end(done);
  });

  it("should return 404 for invalid id", (done) => {
    request(app).get("/api/account/invalid").expect(404, done);
  });
});

describe("PUT /api/account/:id", () => {
  it("should update the account address", (done) => {
    request(app)
      .put("/api/account/1")
      .send({ address: "New Address" })
      .expect(200, done);
  });

  it("should return 404 for invalid id", (done) => {
    request(app)
      .put("/api/account/invalid")
      .send({ address: "New Address" })
      .expect(404, done);
  });
});

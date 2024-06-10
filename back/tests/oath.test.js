const request = require("supertest");
const express = require("express");
const oauthRouter = require("./oauth");

const app = express();
app.use(express.json());
app.use("/oauth", oauthRouter);

describe("POST /oauth/token", () => {
  it("should return a token for valid credentials", (done) => {
    request(app)
      .post("/oauth/token")
      .send({ username: "user", password: "password" })
      .expect(200)
      .expect((res) => {
        if (!res.body.access_token) throw new Error("Missing token");
      })
      .end(done);
  });

  it("should return 401 for invalid credentials", (done) => {
    request(app)
      .post("/oauth/token")
      .send({ username: "wrong", password: "wrong" })
      .expect(401, done);
  });
});

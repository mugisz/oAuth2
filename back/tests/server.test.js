const request = require("supertest");
const express = require("express");

const app = express();

app.post("/login", (req, res) => res.json({ success: true }));
app.get("/api/accounts/:id", (req, res) =>
  res.json({
    id: "12345",
    firstName: "John",
    lastName: "Doe",
    address: "123 Main St",
    dateCreated: "2021-01-01",
    isPaid: true,
  })
);

test("Dummy server-side test", async () => {
  const response = await request(app).get("/api/accounts/12345");
  expect(response.body.id).toBe("12345");
});

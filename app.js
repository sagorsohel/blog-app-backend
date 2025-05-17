const express = require("express");
const userRoute = require("./routes/user.route");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});

app.use("/api/user", userRoute);

module.exports = app;
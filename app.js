const express = require("express");
const userRoute = require("./routes/user.route");
const postRoute = require("./routes/post.route"); // Assuming you have a post route
const app = express();

// Middleware

// ✅ Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Optional: Parses form data

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});

app.use("/api/user", userRoute);
app.use("/api/posts", postRoute);

module.exports = app;

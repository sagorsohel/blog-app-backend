const express = require("express");
// const cors = require('cors');
const path = require("path");
const dotenv = require("dotenv");
const app = express();

const userRoute = require("./routes/user.route");

const PORT = 3000;

// Load environment variables
dotenv.config({ path: path.join(__dirname, ".env") });
// Middleware
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const mongoose = require("mongoose");
const DB_URL = `${process.env.BD_URL}/blog-app-backend`; // Replace with your MongoDB connection string
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });





app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});

app.use("/api/user", userRoute);
// app.use((req, res, next) => {

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

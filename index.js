const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const app = require("./app");

const PORT = 3000;

// Load environment variables
dotenv.config({ path: path.join(__dirname, ".env") });

// Database connection
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
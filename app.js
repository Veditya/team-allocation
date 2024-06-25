const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Home = require("./routes/home");
const Login = require("./routes/login");
const Teams = require("./routes/teams");
require("dotenv").config();

main().catch((err) => console.error("MongoDB connection error:", err));

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

// Middleware
app.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)));
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", Home);
app.use("/api/login", Login);
app.use("/api/teams", Teams);

app.use("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

// Start server
const PORT = process.env.PORT || 3000; // Default to port 3000 if PORT is not defined
app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}...`);
});

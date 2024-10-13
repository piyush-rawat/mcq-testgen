// if (process.env.NODE_ENV == "development") {
require("dotenv").config();
// }

// Connect Database
require("./config/db")();

const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const testsRoutes = require("./routes/testsRoutes");
const testRoutes = require("./routes/testRoutes");
const resultRoutes = require("./routes/resultRoutes");
const auth = require("./middlewares/auth");

const app = express();

app.use(cookieParser());

// Set React Build Folder to serve static files.
app.use(express.static("dist"));

app.use(express.json());

// Backend API Routes
app.use("/api/auth", authRoutes);
app.use("/api/tests", auth, testsRoutes);
app.use("/api/test", auth, testRoutes);
app.use("/api/result", auth, resultRoutes);

// Send React Production Build HTML File
app.get("*", (req, res) => {
  return res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT;

app.listen(PORT, () => console.log("Server Running on PORT", PORT));

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

// View Engine
app.set("view engine", "ejs");

// Routes
const authRoutes = require("./routes/authRotues");
const todoRoutes = require("./routes/todoRoutes");

app.use("/", authRoutes);
app.use("/todos", todoRoutes);

// DB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running on http://localhost:3000");
    });
  })
  .catch((err) => console.log(err));

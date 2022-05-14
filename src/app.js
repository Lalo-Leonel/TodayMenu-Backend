const path = require("path");

require("dotenv").config({
  path: path.resolve(
    process.cwd(),
    process.env.NODE_ENV !== "production"
      ? `.env.${process.env.NODE_ENV}`
      : ".env"
  ),
});
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const usersRouter = require("./routes/users");
const authsRouter = require("./routes/auth");
const menusRouter = require("./routes/menus");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "it´s working" });
});

app.use("/api/users", usersRouter);
app.use("/auth", authsRouter);
app.use("/api/menus", menusRouter);

module.exports = { app };

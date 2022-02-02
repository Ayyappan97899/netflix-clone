if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const mongoose = require("mongoose");
// const dotenv = require("dotenv");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const movieRouter = require("./routes/movies");
const listRouter = require("./routes/lists");
const cors = require("cors");
const app = express();
// dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connection successfull!");
  })
  .catch((err) => console.log("DB connection Failed!"));

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/lists", listRouter);

app.use((err, req, res, next) => {
  if (!err.message) err.message = "Oh boy,Something went wrong";
  res.json({ error: err.message });
});
app.listen(5000, () => {
  console.log("Backend server is running ");
});

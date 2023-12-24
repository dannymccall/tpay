const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const userRoute = require("./routes/user.route");
const loanRoute = require("./routes/loan.route")
//const cusotmerRoute = require("./routes/customer.route");
//const cookieParser = require("cookie-parser");
// const session = require("express-session");
dotenv.config();

const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;

app.use(
  cors({
    methods: ["GET", "POST", "DELETE"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(
//   session({
//     secret: "accurate",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       maxAge: 30 * 24 * 60 * 60,
//       path: "/",
//     },
//   })
// );

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("database connected");
    app.listen(PORT, () => console.log("Server ready to listen to requests"));
  })
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send({message:"hello"});
});

app.use("/auth", userRoute);

app.use("/loan", loanRoute)
// app.use("/accurate-ventures-susu", cusotmerRoute)
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 5000;

// route
const userRoute = require("./routes/user.route");
const roomRoute = require("./routes/room.route");
const levelRoute = require("./routes/level.route");
const authRoute = require("./routes/auth.route");

// Connect database mongodb
main()
  .then(() => console.log("database connected."))
  .catch((err) => console.log(err));
async function main() {
  await mongoose.set("strictQuery", true);
  await mongoose.connect("mongodb://127.0.0.1:27017/branch_applications");
}

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// use routes
app.use("/user", userRoute);
app.use("/room", roomRoute);
app.use("/level", levelRoute);
app.use("/auth", authRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

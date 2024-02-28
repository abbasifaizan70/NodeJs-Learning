const express = require("express");

const { logResRes } = require("./middlewares");
const userRoute = require("./routes/user");
const { connectMongoDb } = require("./connection.js");

const app = express();
const PORT = 8000;

connectMongoDb("mongodb://127.0.0.1:27017/NodeJs-Learning-Youtube")
  .then(() => {
    console.log("MongoDb Connected");
  })
  .catch(err => {
    console.log(err);
  });
app.use(express.urlencoded({ extended: false }));
app.use(logResRes("logs.txt"));

app.use("/api/users", userRoute);
app.listen(PORT, () => console.log(`Server started at Port: ${PORT}`));

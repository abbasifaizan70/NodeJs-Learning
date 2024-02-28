const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

mongoose
  .connect("mongodb://127.0.0.1:27017/NodeJs-Learning-Youtube")
  .then(() => console.log("MongoDB Connects"))
  .catch(err => console.log(err));

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    jobTitle: {
      type: String
    },
    gender: {
      type: String
    }
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  fs.appendFile(
    "logs.txt",
    `${Date.now()}: ${req.method}: ${req.path} \n`,
    (err, data) => {
      next();
    }
  );
});

// routes
app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
});

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    res.status(400).json({ msg: "All fields are required" });
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title
  });

  res.status(201).json({ status: "User created Successfully" });
  // users.push({ ...body, id: users.length + 1 });
  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
  //   return res.json({ status: "Success", id: users.length });
  // });
});

app
  .route("/api/users/:id")
  .get(async(req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    return res.json(user);
  })
  .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { lastName: req.body.last_name })
    return res.json({status: "Updated"});
  })
  .delete(async(req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({Status: "User Deleted"})
  });

app.listen(PORT, () => console.log(`Server started at Port: ${PORT}`));

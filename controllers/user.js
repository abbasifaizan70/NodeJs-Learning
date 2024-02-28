const User = require("../models/user");

const handleGetAllUser = async (req, res) => {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
};

const handleGetUserById = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  return res.json(user);
};

const handleUpdateUserById = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, {
    lastName: req.body.last_name
  });
  return res.json({ status: "Updated" });
};

const handleDeleteUserById = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ Status: "User Deleted" });
};

const hanldeCreateNewUser = async (req, res) => {
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
};


module.exports = {
  handleGetAllUser,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  hanldeCreateNewUser
};

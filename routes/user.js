const express = require("express");
const {
  handleGetAllUser,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  hanldeCreateNewUser
} = require("../controllers/user");
const router = express.Router();

router.route("/").get(handleGetAllUser).post(hanldeCreateNewUser);

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;

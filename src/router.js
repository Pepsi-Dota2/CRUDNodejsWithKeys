const express = require("express");
const rounter = express();
const {
  getBookController,
  createBookController,
  updateBookController,
  deleteBookController,
  getBookByIdController,
} = require("./APIs/book/controller");
const {
  getUserController,
  getUserByIdController,
  createController,
  loginController,
  updateUserController,
  updatePasswordService,
} = require("./APIs/user/controller");
const { verify } = require("../src/util/jwt");

rounter.get("/books", getBookController);
rounter.post("/book/create", createBookController);
rounter.post("/book/update", updateBookController);
rounter.post("/book/delete", deleteBookController);
rounter.post("/book/getById", getBookByIdController);

//user
rounter.get("/users", verify, getUserController);
rounter.post("/create", verify, getUserByIdController);
rounter.post("/user/create", verify, createController);
rounter.post("/user/login", loginController);
rounter.post("/user/update", updateUserController , updatePasswordService);
module.exports = { rounter };

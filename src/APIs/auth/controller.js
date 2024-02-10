const {
  getUsersService,
  getUserByIdService,
  findUserService,
  createUserService,
  updateUserService,
  updatePasswordService,
  updateUserAndPasswordServices,
} = require("./service");
const CryptoJS = require("crypto-js");
const { config } = require("dotenv");
const { sign } = require("../../util/jwt");
config();

//update User
const updateUserController = async (req, res) => {
  const iduser = req.body.iduser;
  const userName = req.body.userName;
  const password = `${req.body.password}`.trim();

  if (password && password.length >= 8) {
    const passwordHash = await CryptoJS.AES.encrypt(
      password,
      process.env.CRYPTO_SECRET_KEY
    ).toString();

    const updateUser = await updateUserAndPasswordServices(
      userName,
      passwordHash,
      iduser
    );
    if (!updateUser) {
      return res.json({ status: "error", message: "ຄຳຂໍຖືກປະຕີເສດ" });
    }
  } else {
    const updateUser = await updateUserService(userName, iduser);
    if (!updateUser) {
      return res.json({ status: "error", message: "ຄຳຂໍຖືກປະຕີເສດ" });
    }
  }
  return res.json({ status: "Success", message: "Update User Successfully" });
};

module.exports = {
  updateUserController,
};

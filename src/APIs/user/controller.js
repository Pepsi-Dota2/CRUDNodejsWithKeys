const {
  getUsersService,
  getUserByIdService,
  findUserService,
  createUserService,
  updateUserService,
  updatePasswordService,
} = require("./service");
const CryptoJS = require("crypto-js");
const { config } = require("dotenv");
const { sign } = require("../../util/jwt");
config();


const getUserController = async (req, res) => {
  const user = await getUsersService();
  if (!user) {
    return req.json({ status: "error", user: [] });
  }
  return res.json({ status: "success", user: user });
};

const getUserByIdController = async (req, res) => {
  const userName = req.body.userName;
  const user = await getUserByIdService(userName);
  if (!user) {
    return res.json({ status: "Not found", message: "Not found" });
  }
  return res.json({ status: "success", user: user });
};

// create Controller user and password
const createController = async (req, res) => {
  const userName = req.body.userName;
  const password = `${req.body.password}`.trim();

  const check = await findUserService(userName);

  //function Check
  if (check) {
    return res.json({ status: "error", message: "User already exits" });
  }

  //encript password ເຂົ້າລະຫັດຜ່ານ
  const passwordHash = await CryptoJS.AES.encrypt(
    password,
    process.env.CRYPTO_SECRET_KEY
  ).toString();
  console.log(passwordHash);

  const user = await createUserService(userName, passwordHash);

  // user null
  if (!user) {
    return res.json({ status: "error", message: "Infomation wrong" });
  }

  return res.json({ status: "success", message: " successfuly" });
};

const loginController = async (req, res) => {
  const userName = req.body.userName;
  const pass = `${req.body.password}`.trim();

  const check = await findUserService(userName);

  if (!check) {
    return res.json({ status: "error", message: "Username or password wrong" });
  }

  //ປຽບທຽບລະຫັດຜ່ານ ຖອດລະຫັດ
  const decriptPass = CryptoJS.AES.decrypt(
    check.password,
    process.env.CRYPTO_SECRET_KEY
  ).toString(CryptoJS.enc.Utf8);

  // ລົບkey ທີ່ມີຊື່ວ່າ password ອອກຈາກ Object check ແລ້ວຈະໄດ້ Object ໄໝ່ທີ່ມີຊື່ວ່າ user
  // it can delete only object
  const { password, ...user } = check;

  const token = sign(user);

  if (decriptPass !== pass) {
    return res.json({
      status: "error",
      message: " Username or password is wrong pass",
    });
  }

  return res.json({ status: "success", user: { ...user, token } });
};

//update User
const updateUserController = async (req, res) => {
  const iduser = req.body.iduser;
  const userNmae = req.body.userName;
  const password = req.body.password;

  // you should type same parms in parms service
  const user = await updateUserService(userNmae,iduser);

  console.log("==========================xxxxxxxxxxxxxxxxxxxxx", user);

  if (!user) {
    return res.json({status: "error" , message: "ຄຳຂໍຖືກປະຕີເສດ"});
  }


  if (password && password.length >7) {
     await updatePasswordService(password ,iduser);
    return res.json({iduser : Number(iduser) , password: "ອັດເດດລະຫັດສຳເລັດ"});
  }

  return res.json({ status: "Success", message: "ລົບຂໍ້ມູນສຳເລັດ" });
};

// Delete User
const deleteUserController = async (req, res) => {
  const iduser = req.body.iduser;
  const user = await deleteUserService(iduser);
};

module.exports = {
  getUserController,
  getUserByIdController,
  createController,
  loginController,
  updateUserController,
  updatePasswordService,
  deleteUserController,
};

const { Mysqlclient } = require("../../util/db");

//update Service
const updateUserService = async (userName, iduser) => {
  try {
    const sql = `UPDATE user SET  userName = ?  WHERE iduser = ?`;
    const params = [userName, iduser];
    const result = await Mysqlclient.query(sql, params);

    if (result.length > 0 && result[0].affectedRows == 1) {
      return true;
    }
    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const updateUserAndPasswordServices = async (userName, password, iduser) => {
  try {
    //sql
    const sql = `UPDATE user SET  userName = ?, password = ?  WHERE iduser = ?`;
    const params = [userName, password, iduser];
    const result = await Mysqlclient.query(sql, params);
    if (result.length > 0 && result[0].affectedRows == 1) {
      return true;
    }
    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

module.exports = {
  updateUserService,
  updateUserAndPasswordServices,
};

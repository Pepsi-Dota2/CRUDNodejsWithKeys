const { Mysqlclient } = require("../../util/db");

async function getUsersService()  {
    try {
        const result = await Mysqlclient.query("SELECT * FROM user");
        console.log("Test get user",result);
        if(result.length>0){
            return result[0];
        }return null;
        
    } catch (e) {
        console.log(e);
        return null;
    }
}


// error Promise how to fix use async and await

async function getUserByIdService(userName){
    try {
        const sql = "SELECT * FROM user WHERE userName = ?";
        const params = [userName];
        const result = await Mysqlclient.query(sql , params);
        console.log("Test create user", result);
        if(result.length>0){
            return result[0][0];
        }
        return null;
        
    } catch (e) {
        console.log(e);
        return null;
    }
}



const findUserService = async (username) =>{
    try {
        const sql = `SELECT * FROM user WHERE userName = ?`;
        const params = (username);

        const result = await Mysqlclient.query(sql , params);

        if(result[0].length > 0){
            return result[0][0];
        }
        return null;
        
    } catch (error) {
        console.log("error");
        return null;
    }
};

const createUserService = async (username , password) => {
    console.log({username , password});
    try {
        const sql = `INSERT INTO user (userName , password) VALUES (?,?)`;
        const params = [username , password];

        const result = await Mysqlclient.query(sql , params);

        return result;
        
    } catch (error) {
        console.log(error);
        return null;
    }
}


//update Service
const updateUserService = async (userName ,iduser ) =>{
    console.log({ userName , iduser});


    try {
        //sql 
        const sql = `UPDATE user SET  userName=?  WHERE iduser = ?`; 

        //parms 
        const params = [userName , iduser];

        //result 
       const result = await Mysqlclient.query(sql,params);

        //controlflow  
        if(result.length >0 && result[0].affectedRows == 1){
            return true;
        }
         return null;
      
        
    } catch (e) {
        console.log(e);
        return null;
    }

}

const updatePasswordService = async (password , iduser) => {
    try {
        //sql 
        const sql = "UPDATE user SET password= ? WHERE iduser=?";

        //params
        const params = [password , iduser];
        //result
        const result = Mysqlclient.query(sql , params);
        
        //control flow
        if(result.length >0 && result[0].affectedRows == 1){
            return true;
        }
         return null;
        
    } catch (e) {
        console.log(e);
        return null;
    }

}

const deleteUserService = (iduser) =>{
    console.log(iduser);

    try {
        
    } catch (error) {
        return null;
    }
}




module.exports = {
    getUsersService,
    getUserByIdService,
    //find
    findUserService,
    createUserService,
    //update
    updateUserService,
    updatePasswordService,
    //delete
    deleteUserService,
}
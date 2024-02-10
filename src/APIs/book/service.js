const { Mysqlclient } = require("../../util/db")

const getBookService = async ()=>{
    try {
       const result = await Mysqlclient.query("SELECT * FROM books")
       console.log(result);
       if(result.length >0){
        return result[0];
       }
       return null;
    } catch (e) {
        console.log(e)
        return null;
    }
}


// this function for search
const getBookByKeyService = async (key)=>{
    try {

        // % + value +%  ເມື່ອມີຄ່າຄ້າຍຄືກັນໃຫ້ດືງ ອອກມາ ຊ້າຍ ຂວາ ກໍໄດ້
       const _key = "%" + key + "%";

       const sql = "SELECT * FROM books WHERE id = ? or bookType like ? or bookName like ?";
       const params = [key , _key , _key];
       const result = await Mysqlclient.query(sql , params);
       console.log(result);
       if(result.length >0){
        return result[0];
       }
       return null;
    } catch (e) {
        console.log(e)
        return null;
    }
}


//this function for Create
const createBookService = async (bookType , bookName,author)=>{
    try {
        const sql = `INSERT INTO books (bookType,bookName,author) VALUES(?,?,?)`;
        const params = [bookType , bookName , author]

       const result = await Mysqlclient.query(sql, params);
       console.log(result);
       return result;
    } catch (e) {
        console.log(e)
        return null;
    }
}


// this function for Update
const updateBookService = async (bookType , bookName,author , id)=>{
    console.log("-==========================================",{ bookType,bookName,author,id})
    try {
        const sql = `UPDATE books SET  bookType= ? , bookName= ? , author= ? WHERE id = ?`;
        const params = [bookType , bookName , author , id]

       const result = await Mysqlclient.query(sql, params);
    //    console.log("====================================================",result[0].affectedRows);
       if(result.length>0 ){
            return  true ;
       }return null;
       
    } catch (e) {
        console.log(e)
        return null;
    }
}

//this function for delete
const deleteBookService = async (id)=>{

    try {
        const sql = `DELETE FROM books WHERE id = ?`;
        const params = [id]

       const result = await Mysqlclient.query(sql, params);
    //    console.log("====================================================delete",result);
       if(result.length >0 && result[0].affectedRows == 1){
            return  true ;
       }return null;

    } catch (e) {
        console.log(e)
        return null;
    }
}


module.exports = {
    getBookService,
    createBookService,
    updateBookService,
    deleteBookService,
    getBookByKeyService 
}

const jwt = require("jsonwebtoken");
const i = "ChampaLab Ltd" // Issuer (Software organization who issues the token)
const s = "sonephetmnlv@gmail.com" // Subject (intended user of the token)
const a = "https://champalab.la" // Audience (Domain within which this token will live and function)
const { config } = require("dotenv");
config();


// sign information token
const sign = (payload)=>{
    const privatekey = process.env.JWT_PRIVATE_KEY ;
    console.log('kjfnfkjgvnfkjvnfdkjvnfdkjvnfknvkfnvdkfnv====',privatekey);
    try {
        const token = jwt.sign(payload , privatekey ,{
            issuer: i,
            subject:s,
            audience:a,
            expiresIn:"1h",//Expiration time in minutes
            algorithm:'RS256',
        });
        return token;
    } catch (e) {
        return null;
    }
};

const verify = (req , res , next) =>{
    // this is key for entry "node-demo-token", so you can modify name
    const token = req.headers["node-demo-token"];
    if(!token){
        return res.json({status: " error" , message: " Token unauthorized"});
    }

    const option = {
        issuer: i,
        subject:s,
        audience:a,
        expiresIn:"1h",//Expiration time in minutes
        algorithm:'RS256',
    }

    const pubilckey = process.env.JWT_PUBLIC_KEY;

    jwt.verify(token, pubilckey, option, (err, decoded)=>{
        if(err){
            console.log(err);
            return res.json({status: "error", message: "Token unauthorized"});
        }

        if(decoded){
            req.token = decoded;
        }

        next();
    });
    console.log(token);
};


module.exports = {
    sign,
    verify
}
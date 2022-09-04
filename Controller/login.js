let sanjeev =require('../Model/db')
let jwt =require("jsonwebtoken")
let bcrypt =require("bcrypt");

// const { rmSync } = require('fs');

let userRegister = async(req, res) => {
    try{
        let  {email, password, mobile} = req.body;
        let Salt = await bcrypt.genSalt(8)
        let haspassword =bcrypt.hashSync(password,Salt)
        password = haspassword
        const data =(email,mobile,password)
        let sqlquery="INSRT INTO login SET ?";
        await sanjeev.query(sqlquery, data, (err,result)=>{
            if(err){
                return res.json({Error: err.message})
            }
            res.json({status:200, "response":result})
        })
    } catch(err){
        res.json({status:400, response:err.message})
    }
}

let userlogin =async(req,res)=>{
    try{
        let  {email, password, mobile} = req.body;
        let sqlquery=` SELECT * FROM login WHERE email="${email}" OR mobile ="${mobile}"`
        await sanjeev.query(sqlQuery,async(err,result)=>{
            if(err){
                return res.json({Error: err.message})
            }
            if (result===[] || result == undefined){
                return res.json({response:"Eamil id or the mobile number doesn't exists"})
            }

            const userresponse =result[0].password

            const passwordCheck =await bcrypt.compare
            (password, userresponse);
            if(!passwordCheck){
                return req.json({Error: "oops wrong password "});
            }

            const token = await jwt.sign({email}, process.env.jwt_SECRET_KEY,{expiresIn:"id"})


            res.json({status:200, response:"logged in successfull", token})
        })
    }catch(err){
        res.json({status:400, "response":err.message})
    }
}
 module.exports={userRegister,userlogin}

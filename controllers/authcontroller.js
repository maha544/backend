const UserModel = require("../models/usermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authController = {

    signup : async (request , response) => {
        try {
            let body = request.body;
            let obj = {
                firstName: body.firstName,
                lasrName: body.lastName,
                email : body.email,
                password : body.password
            }

            let existingUser = await UserModel.findOne({
                email : obj.email
            })

            if(existingUser){
                response.statue(409).send({
                    isSuccessful : false,
                    data : null,
                    message :'user wuth this email is already exist',                
                })
                return;
            } else {
                obj.password = await bcrypt.hash(obj.password , 10)

                let UserObj = new UserModel(obj)
                UserObj.save()
                .then((result) => {
                    response.status(201).send({
                        isSuccessfull: true,
                        data: result,
                        message: "User Created Successfully"
                    })
                })
                .catch((error) => {
                    throw error
                })

            }
            
        } catch (error) {
            response.status(500).send({
                isSuccessful : false,
                data : null,
                message : "internal server err",
            });
            
        }
    },
    login : async (request , response) => {
        try {

            let body = request.body;
            let existingUser = await UserModel.findOne(
                { email: body.email });

            if(!existingUser) {
                response.status(401).send({
                    isSuccessfull : false,
                    data : null,
                    message : 'invalid credentials'
                })
                return;
            }else{
                isCorrectPswd = await bcrypt.compare(body.password , existingUser.password)

                if(isCorrectPswd){
                    response.status(200).send({
                        isSuccessfull: true,
                        data : existingUser,
                        token : await jwt.sign({...existingUser}, process.env.SECURITY_KEY) ,
                    })
                }
            }    
            
        } catch (error) {
            response.status(500).send({
                isSuccessful: false,
                data: null,
                message: 'internal server error'
            })
            
        }
    },

    protected : async (req,res,next) => {
        let token = req.headers.authorization.split(' ')[1];
        console.log(token);

        const loggedInUser = await jwt.verify(token, process.env.SECURITY_KEY);

        if(loggedInUser?._doc){
            next();
        } else{
            res.status(401).send({
                isSuccessfull:false,
                data : null,
                message : 'Unauthorized user'
            })
        }
    }


};

module.exports = authController;
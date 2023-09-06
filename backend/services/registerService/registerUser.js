const User = require('../../models/userModel/User');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();
const apikey = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(apikey);


class UserService {
    async getAllUsers() {
        try {
            const user = await User.find();
            return user;
        } catch (error) {
            console.log(error);
        }
    }


    async registerUser(req) {
        const {username, email, password, phone, gender} = req.body;
        const token = crypto.randomBytes(64).toString("hex");
        const newUser = new User({
        username: username,
        email: email,
        password: password,
        phone:phone,
        token:token,
        gender: gender,
        isVerified:false     
    });        
        const message = {
        to: "hashimtayyab01@gmail.com",
        from: {
            name: "HRMS Verification",
            email: process.env.FROM_EMAIL
        },
        templateId: process.env.TEMPLATE_ID,
        DynamicTemplateData :{
        verification_link: `http://localhost:4000/verifymail?token=${token}`,
        }
    }
        try {
            sgMail.send(message)
            .then(() => console.log("Email sent successfully"))
            .catch((err) => console.log(err));
            const user = await newUser.save().then(() => console.log("User Added"));
            return user;
        } catch (error) {
            console.log(error);
        }
    }


    async verifyMail(req, res){
        try {
            console.log(req.query.token);
            const findUser = await User.findOne({
                token: req.query.token,
            });
            // if(!findUser){
            //     return res.status(400).json({
            //         message: "Invalid token"
            //     })
            // }
            // else{
                findUser.token = null;
                findUser.isVerified = true;
                console.log(findUser.email);
                await findUser.save();
                return res.json({
                    message: "Email verified"
                })
            // }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new UserService();
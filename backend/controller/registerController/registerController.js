const {getAllUsers, registerUser, verifyMail} = require('../../services/registerService/registerUser');
const User = require('../../models/userModel/User');

class UserController {
    async getAllUsers(req, res) {
        const users = await getAllUsers();
        return res.status(200).json(users);
    }

    async registerUser(req, res) {
        const user = await registerUser(req);
        return res.status(201).json(user);
    }

    async verifyMail(req, res){
        const user = await verifyMail(req);
        return res.status(201).json(user);
    }
}

module.exports = new UserController();
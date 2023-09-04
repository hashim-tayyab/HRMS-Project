const {getAllUsers, registerUser} = require('../../services/registerService/registerUser');
const User = require('../../models/userModel/User');

class UserController {
    async getAllUsers(req, res) {
        const users = await getAllUsers();
        return res.status(200).json(users);
    }

    async registerUser(req, res) {
        // const {username, email, password} = req.body;
        // const newUser = new User({
        //     username: username,
        //     email: email,
        //     password: password,
        //   });
        // const newUser = new User({
        //     username: 'john_doe',
        //     email: 'john@example.com',
        //     password: 'password123',
        //   });
        const user = await registerUser(req);
        return res.status(201).json(user);
    }
}

module.exports = new UserController();
const User = require('../../models/userModel/User');

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
        try {
            const {username, email, password} = req.body;
            const newUser = new User({
            username: username,
            email: email,
            password: password,
          });
            const user = await newUser.save();
            return user;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new UserService();
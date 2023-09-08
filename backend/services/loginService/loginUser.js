const User = require('../../models/userModel/User');
const jwt = require('jsonwebtoken');

class LoginUserService {
    async loginUser(req, res) {
        try {
            const user = await User.findOne({
                email: req.body.email
            });
            if(user.password === req.body.password) {
                // console.log("UNDERDCORE ID:", res.data._id);
                const token = jwt.sign({
                id: user._id
              }, 'secret123', {
            expiresIn: 3600 // expires in 1 hour
          })
                return {user, token: token};
            }
            else{
                return false;
            }

        } catch (error) {
            console.log(error);
        }
    }  

    async getUserById(req) {
        try {
            const user = await User.findOne({
            _id: req.params.userId,
            });
            return user;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new LoginUserService();
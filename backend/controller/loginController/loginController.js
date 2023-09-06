const {loginUser} = require('../../services/loginService/loginUser');

class LoginUserController {
    async loginUser(req, res) {
        try {
            const user = await loginUser(req);
            if(user) {
                console.log('User Passed');
                return res.status(200).json({message: 'Success'});
            }
            else{
                console.log('User Failed');
                return res.status(401).json({message: 'Invalid username or password'});
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new LoginUserController();
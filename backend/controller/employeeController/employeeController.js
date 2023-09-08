const {addEmployee, getEmployeesList} = require('../../services/employeeService/employeeService');
const jwt = require('jsonwebtoken');

class LoginUserController {

    async getEmployeesList(req ,res){
        try {
            const employees = await getEmployeesList();
            return res.json(employees);
        } catch (error) {
            console.log(error);
        }
    }
    async addEmployee(req, res) {
        try {
            const employee = await addEmployee(req);
            return res.status(200).json(employee);
        } catch (error) {
            console.log(error);
        }
    }

    // async getUserById(req, res) {
    //     const user = await getUserById(req);
    //     return res.status(200).json(user);
    // }


}

module.exports = new LoginUserController();
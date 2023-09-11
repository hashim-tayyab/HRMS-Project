const Employee = require('../../models/employeeModel/Employee');
const jwt = require('jsonwebtoken');

class EmployeeService {

    async getEmployeesList(){
        try {
            const employees = await Employee.find();
            return employees;
        } catch (error) {
            console.log(error);
        }
    }

    async getMyAddedEmployees(req, res){
        try {
            const employees = await Employee.find({
                addedBy: req.params.manager
            });
            return employees
        } catch (error) {
            console.log(error);
        }
    }

    async getEmployeeById(req, res){
        try {
            const employee = await Employee.findOne({
                _id: req.params.userId
            });
            return employee;
        } catch (error) {
            console.log(error);
        }
    }

    async addEmployee(req) {
        const {username, email, password, phone, addedBy, companyName, position} = req.body;
        const newEmployee = new Employee({
        username: username,
        email: email,
        password: password,
        phone:phone,
        addedBy:addedBy,
        companyName: companyName,
        position: position,
    });        
        try {
            const employee = await newEmployee.save().then(() => console.log("Employee Added Successfully"));
            return employee;
        } catch (error) {
            console.log(error);
        }
    }


    async loginAsEmployee(req, res) {
        try {
            const employee = await Employee.findOne({
                email: req.body.email
            });
            console.log("EMPLOYEE", employee);
            if(employee.password === req.body.password) {
                const token = jwt.sign({
                id: employee._id
              }, 'secret123', {
            expiresIn: 3600 // expires in 1 hour
            })
                return {employee, token: token};
            }
            else{
                return false;
            }

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new EmployeeService();
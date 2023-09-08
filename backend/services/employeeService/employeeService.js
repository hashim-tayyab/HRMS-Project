const Employee = require('../../models/employeeModel/Employee');

class EmployeeService {

    async getEmployeesList(){
        try {
            const employees = await Employee.find();
            return employees;
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
}

module.exports = new EmployeeService();
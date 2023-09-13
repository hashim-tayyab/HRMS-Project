const {addCheckInTime, addCheckOutTime} = require('../../services/attendanceService/attendanceService');

class AttendanceController {
    async addCheckInTime(req, res) {
        const attendance = await addCheckInTime(req);
        return res.status(200);
    }
    async addCheckOutTime(req, res) {
        const attendance = await addCheckOutTime(req);
        return res.status(200);
    }
}

module.exports = new AttendanceController();
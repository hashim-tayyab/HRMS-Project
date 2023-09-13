const Attendance =  require("../../models/attendanceModel/Attendance");
const { findOneAndUpdate } =  require("../../models/attendanceModel/Attendance");

class AttendanceService {

    async addCheckInTime(req, res){
        // console.log("Inside addCheckInTime Service");
        const findUser = await Attendance.findOne({
            employee: req.params.userId,
        });
        // console.log(findUser);
        if(!findUser) {
            console.log("!finduser", req.body.checkInTime)
            const userCheckIn = new Attendance({
                employee: req.params.userId,
                attendance: { 
                    date: req.body.date, 
                    check_in_time: req.body.checkInTime, 
                },
            })
            userCheckIn.save().then((response) => {console.log(response)});
            return userCheckIn;
        }
        else if(findUser){
            // console.log("finduser");
            const filter = {employee: req.params.userId}
            const updatedAttendance = Attendance.findOneAndUpdate(filter,
                { $push: { attendance: { date: req.body.date, check_in_time: req.body.checkInTime } } }
                )
            return updatedAttendance;
        }
    }


    async addCheckOutTime(req, res) {
        try {
            const findUser = await Attendance.findOne({
                employee: req.params.userId,
            });
            if(findUser){
                const filter = {employee: req.params.userId}
                const updatedAttendance = Attendance.findOneAndUpdate(filter,
                    { $push: { attendance: { check_out_time: req.body.checkOutTime } } }
                )
                return updatedAttendance;
            }
        } catch(error) {
            console.log(error);
        } 
    }   
}
module.exports = new AttendanceService();
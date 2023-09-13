const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    attendance: 
    [
       {
        date: { 
            type: String,
        },
        check_in_time: {
            type: String, 
        },
        check_out_time: {
            type: String 
        },
        }
    ]

});


module.exports = mongoose.model("Attendance", attendanceSchema);
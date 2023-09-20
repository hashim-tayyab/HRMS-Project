const Attendance = require('../../models/attendanceModel/Attendance');
const Employee = require('../../models/employeeModel/Employee')

// const getEmployees = async () => {
//   try {
//     const employees = await Employee.find();
//     const employeeIds = employees.map((employee) => employee.id);
//     if (employeeIds.length > 0) {
//       try {
//         employeeIds.map(async (employeeId) => {
//           const attCount = await Attendance.findOne(
//             { employee: employeeId },
//             {
//               count: { $size: "$attendance" },
//             }
//           ).lean();
//           var position = parseInt(attCount.count) - 1;
//           const findUser = await Attendance.findOne({
//             employee: employeeId,
//           });
//           if (findUser) {
//             const date = new Date();
//             const filter = { employee: employeeId };
//             const updatedAttendance = Attendance.findOneAndUpdate(filter, {
//               $set: {
//                 [`attendance.${position}.check_out_time`]:date,},
//             },{
//                 new: true, // This ensures you get the updated document after the update
//                 runValidators: true, // This runs the validators on the update
//                 arrayFilters: [
//                   {
//                     [`attendance.${position}.check_out_time`]: { $eq: null },
//                   },
//                 ],});
//             return updatedAttendance;
//           }
//         });
//       } catch (err) {
//         console.log(err);
//       }
//     }
//     return employees;
//   } catch (error) {
//     console.log(error);
//   }
// };

const getEmployees = async () => {
    try {
      const employees = await Employee.find();
      const employeeIds = employees.map((employee) => employee.id);
      console.log("employeeIds", employeeIds);
      if (employeeIds.length > 0) {
  
          employeeIds.map(async (employeeId) => {
            const attCount = await Attendance.findOne(
              { employee: employeeId },
              {
                count: { $size: "$attendance" },
              }
            ).lean();
            var position = parseInt(attCount.count) - 1;
            const findUser = await Attendance.findOne({
              employee: employeeId,
            });
            if (findUser) {
              const date = new Date();
              const filter = { employee: employeeId };
              console.log(employeeId, employeeId);

              const updatedAttendance = Attendance.findOneAndUpdate(filter, {
                lastCheckout: { $arrayElemAt: ['$attendance.check_out_time', position]},
              });


            //   if(updatedAttendance.lastCheckout === null){
            //     const updatedAttendance = Attendance.findOneAndUpdate(filter, {
            //     {$set: {
            //         [`attendance.${position}.check_out_time`]: req.body.checkOutTime
            //       },}
            //   })
            //     }
            //     }
            // }
            //   return updatedAttendance;
            }
          });
      }
      return employees;
    } catch (error) {
      console.log(error);
    }
  };



//   $set: {
//     [`attendance.${position}.check_out_time`]: {
//         $ifNull: [[`attendance.${position}.check_out_time`], date]
//     }
// }

//   {
//     new: true, // This ensures you get the updated document after the update
//     runValidators: true, // This runs the validators on the update
//     arrayFilters: [
//       {
//         [`attendance.${position}.check_out_time`]: { $eq: null },
//       },
    // ],}

module.exports = { getEmployees };
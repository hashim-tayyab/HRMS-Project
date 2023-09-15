const Leave = require('../../models/leaveModel/Leave');

class LeaveService {
    async applyForLeave(req, res){
        try {
            const leave = new Leave({
                employee: req.params.userId,
                admin: req.body.admin,
                reqStatus: 'pending...',
                dateApplied: new Date(),
                // dateApplied: req.body.dateApplied,
                appliedFrom: req.body.appliedFrom,
                appliedTill :req.body.appliedTill,
            })
            leave.save().then((response) => {console.log(response)});
            return leave;
        } catch (error) {
            console.error("Cannot apply for leave:", error);
        }
    }

    async viewLeaveReq(req, res) {
        try {
            const leave = Leave.findOne(
                {admin: req.params.userId},
            ).lean();
            return leave;
        } catch (error) {
            console.log("Cannot view leave:", error);
        }
    }


    async viewLeaveApplied(req, res){
        try {
            const leaves = await Leave.findOne(
                { employee: req.params.userId,
                // employee: req.params.userId,
            }).lean();
            // console.log("leaves", leaves);
            return leaves;
        } catch (error) {
            console.log("Cannot view your leave Requests:", error);
        }
    }


    async updateLeaveStatus(req, res) {
        try {
            const leave = Leave.findOneAndUpdate(
                {admin: req.params.userId},
                { $set: { reqStatus: req.body.status } },
            )
            return leave;
        } catch (error) {
            console.log("Cannot update leave status:", error);
        }
    }

}

module.exports = new LeaveService();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


 const MakePayment = async (req, res) => {
    try {
        const payment = await stripe.paymentIntents.create({
            amount :req.body.amount,
            currency: "USD",
            description: "Payment",
            payment_method: req.body.id,
            confirm: true,
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never'
            }
        })

        console.log("Payment", payment)
        res.json({
            message: "Payment was successful",
            success: true
        })
    } catch (error) {
        console.log("Error", error)
        res.json({
            message: "Payment Failed",
            success: false
        })
    }
}

module .exports = {MakePayment};
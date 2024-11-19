import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//place order
async function placeOrder(req, res){
    const FRONTEND_URL= "http://localhost:5173";
    try {
        const order = new orderModel({
            userId : req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        await order.save()
        await userModel.findByIdAndUpdate(req.body.userId, {cartData:{}})

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data : {
                    name: item.name,
                },
                unit_amount: item.price *100
            },
            quantity: item.quantity
        }))
        line_items.push({
            price_data: {
                currency: "usd",
                product_data : {
                    name: "Delivery Fee",
                },
                unit_amount: 5.99 *100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${FRONTEND_URL}/verifyPayment?success=true&orderId=${order._id}`,
            cancel_url: `${FRONTEND_URL}/verifyPayment?success=false&orderId=${order._id}`,
        });
        res.json({success:true, session_url: session.url })

    } catch (error) {
        res.json({success:false, message: "Error"})
    }
}

async function verifyPayment (req, res){
    const {orderId, success} = req.body;
    console.log(req.body);
    console.log(orderId, success);
    
    try{
        if(success == "true"){
            await orderModel.findByIdAndUpdate(orderId, {payment: true});
            res.json({success:true, message: "Paid"})
        }else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:true, message: "Not Paid"})
        }
    } catch{
        res.json({success:false, message: "Error"})
    }
}

//display user order
async function userOrders(req, res){
    try {
        const orders = await orderModel.find({ userId: req.body.userId});
        res.json( {success: true, data : orders})

    } catch (error) {
        res.json({success: false, message:"Error"})
    }
}

//list all orders in the admin panel
async function listOrders (req, res){
    try {
        const orders = await orderModel.find({});
        res.json({success: true, data: orders})
    } catch (error) {
        res.json({success: false, message: "Error"})
    }
}

//admin update order status
async function updatStatus(req, res){
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status})
        res.json({success: true, message: 'Status Updated'})
    } catch (error) {
        res.json({success: false, message: 'Error'})
    }
}
export {placeOrder, verifyPayment, userOrders,listOrders, updatStatus};
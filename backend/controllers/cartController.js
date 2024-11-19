import userModel from "../models/userModel.js";

//fetch user cart info
async function getCart (req, res){
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json( {success: true, cartData});
    } catch (error) {
        res.json( {success: false, message: "Error"});
    }
}

// add item to user cart
async function addToCart (req,res){
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate (req.body.userId, {cartData});
        res.json( {success: true, message: "Add To Cart"});
    } catch (error) {
        res.json( {success: false, message: "Error"});
    }
}

async function removeFromCart (req,res){
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if ( cartData[req.body.itemId] > 1){
            cartData[req.body.itemId] -= 1;
        }else if ( cartData[req.body.itemId] === 1){
            delete cartData[req.body.itemId];
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json( {success: true, message: "Removed from Cart"});
    } catch (error) {
        res.json( {success: false, message: "Error"});
    }
}

export {addToCart, removeFromCart, getCart}
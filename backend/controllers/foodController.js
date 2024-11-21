import foodModel from "../models/foodModel.js";
import fs from 'fs';

const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    const food = new foodModel ({
        name : req.body.name, 
        description : req.body.description,
        price: req.body.price,
        category:req.body.category,
        image : image_filename
    })
    try {
        await food.save();
        res.json({success:true, message: "Food Added"})
    }catch{
        console.log(error)
        res.json({success:false, message: "Error"})
    }
}

//get all food
const listFood = async (req, res) => {
    const { searchString } = req.query;
    try {
        const foods = await foodModel.find({ "name" : {"$regex": searchString, $options: 'i'}});
        res.json({success:true, data:foods})
    } catch (error) {
        console.log(error)
        res.json({success:false, message: "Error"})
    }
}

//remove a food item by id
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Food has been removed"})
    } catch (error) {
        res.json({success: false, message: "Error"})
    }
}

//remove all

export {addFood, listFood, removeFood}
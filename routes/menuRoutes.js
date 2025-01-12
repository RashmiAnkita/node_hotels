const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/Menu')        // 2 model schema

router.post('/', async(req,res)=>{
    try{
        const data = req.body;
        const newMenu = new MenuItem(data);
        const response = await newMenu.save();
        res.status(200).json(response);
    }catch(error){
        console.log(error);
        res.status(500).json({error : 'Internal Server error'});
    }
})

router.get('/', async(req,res)=>{
    try{
        const data = await MenuItem.find();
        res.status(200).json(data);
    }catch(error){
        console.log(error);
        res.status(500).json({error : 'Internal Server error'});
    }
})

// Parameterized API call
router.get('/:tasteType', async(req,res)=>{          // workType as a variable which contains params value
    try{
        const tasteType = req.params.tasteType; 
        if(tasteType == "sweet" || tasteType == "spicy" || tasteType == "sour" || tasteType == "bitter"){
            const response = await MenuItem.find({taste : tasteType})           //{ work is the schema and workType containsthe params value}
            res.status(200).json(response);
        }else{
            res.status(404).json({error : "Invalid work type"});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({error : 'Internal Server error'});
    }
})

module.exports = router;
 
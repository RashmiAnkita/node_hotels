const express = require('express');
const router = express.Router();
const Person = require('./../models/person')           // 2 model schema

router.post('/', async(req,res)=>{                 // 4 create an endpoint
    try{
        const data = req.body                     // Assuming request body contains the person data
        // Create a new Person
        const newPerson =  new Person(data);
        //Save the new person to thedatabase
        const response = await newPerson.save();
        console.log('data saved successfully');
        res.status(200).json(response);
    }catch(error){
        console.log(error);
        res.status(500).json({error : 'Internal Server error'});
    }
})

router.get('/', async(req, res)=>{
    try{
        const data = await Person.find();
        console.log('data fetched successfully');
        res.status(200).json(data);
    }catch(error){
        console.log(error);
        res.status(500).json({error : 'Internal Server error'});
    }
})

// Parameterized API call
router.get('/:workType', async(req,res)=>{          // workType as a variable which contains params value
    try{
        const workType = req.params.workType;
        if(workType == "Chef" || workType == "waiter" || workType == "manager"){
            const response = await Person.find({work : workType})           //{ work is the schema and workType containsthe params value}
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

router.put("/:id", async(req,res)=>{
    try{
        const personId = req.params.id;
        const updatedPersonData = req.body;     // Update data for that person
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData,{
            new: true,                  // Return the updated documnet
            runValidators : true            // Run mongoose validator
        })

        if(!response){
            return  res.status(404).json({error : "Person not found"});
        }

        res.status(200).json(response);
    }catch(error){
        console.log(error);
        res.status(500).json({error : 'Internal Server error'});
    }
})


router.delete("/:id", async(req,res)=>{
    try{
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);

        if(!response){
            return  res.status(404).json({error : "Person not found"});
        }
        
        res.status(200).json({message : "Person deleted successfully"});
    }catch(error){
        console.log(error);
        res.status(500).json({error : 'Internal Server error'});
    }
})
module.exports = router;
const express = require("express");
const router = express.Router();
const Person = require("../models/Person");  



router.post("/", async (req, res) => {
    try {
      const data = req.body; // assuming the request body contains the person data
  
      // create a new person document using the mongoose model
      const newPerson = new Person(data);
  
      // save the new person document to the database
      const response = await newPerson.save();
  
      console.log("Data saved");
      res.status(200).json(response);
  
    } catch (error) {
      console.error("Error saving person:", error);
      res.status(500).json({ error: "Failed to save person" });
    }
  }); 
  
  // get route to get all persons
  router.get('/', async (req, res) => {
      try {
          const response = await Person.find({});
          res.status(200).json(response);
          
      } catch (error) {
          console.error("Error fetching persons:", error);
          res.status(500).json({ error: "Failed to fetch persons" });
      }
  });
  router.get('/:workType',async function(req,res){
    try {
      const workType = req.params.workType;
      
      if(workType == 'chef'|| workType == 'waiter'|| workType == 'manager'){
        const response = await Person.find({ work: workType });
        res.status(200).json(response);
      }else{
        res.status(400).json({ error: "Invalid work type" });
      }
      
    } catch (error) {
      console.error("Error fetching persons by work type:", error);
      res.status(500).json({ error: "Failed to fetch persons by work type" });
      
    }
  })

  router.put('/:id',async (req,res)=>{
    try {
      const personId = req.params.id;
      const updatedPersonData = req.body
      const response = await Person.findByIdAndUpdate(personId, updatedPersonData,{
        new: true,// return the updated document
        runValidators: true // run mongoos validation
      })

      if(!response){
        return res.status(404).json({ error: "Person not found" });
      }
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch persons" });
    
    }
  })

router.delete('/:id',async (req,res)=>{
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    
    if(!response){
      return res.status(404).json({ error: "Person not found" });
    }
    res.status(200).json({message: "Person deleted successfully"});

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch persons" });
  }
})




  module.exports  = router
  
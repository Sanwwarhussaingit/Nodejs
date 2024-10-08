const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

const { jwtAuthMiddleware, generateToken } = require("../jwt");

router.post("/signup", async (req, res) => {
  try {
    const data = req.body; // assuming the request body contains the person data

    // create a new person document using the mongoose model
    const newPerson = new Person(data);

    // save the new person document to the database
    const response = await newPerson.save();

    console.log("Data saved");

    const payload = {
      id: response.id,
      username: response.username,
    };
    const token = generateToken(payload);

    console.log(JSON.stringify(payload));
    console.log("token is: ", token);

    res.status(200).json({ response, token });
  } catch (error) {
    console.error("Error saving person:", error);
    res.status(500).json({ error: "Failed to save person" });
  }
});

//login user
router.post("/login", async function (req, res) {
  try {
    const { username, password } = req.body;
    //find user username and password
    const user = await Person.findOne({ username: username });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    //generate token
    const payload = {
      id: user.id,
      username: user.username,
    };
    const token = generateToken(payload);
    //return token
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Failed to log in user" });
  }
});


// get route to get a person by id
router.get('/profile',jwtAuthMiddleware, async (req,res) =>{
  try {
    
    const userData = req.user;
    console.log("User Data", userData);
    const userId = userData.id;
    const user = await Person.findById(userId);
    res.status(200).json({user:user})
  } catch (error) {

    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Failed to log in user" });
    
  }
})




// get route to get all persons
router.get("/",jwtAuthMiddleware, async (req, res) => {
  try {
    const response = await Person.find({});
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching persons:", error);
    res.status(500).json({ error: "Failed to fetch persons" });
  }
});
router.get("/:workType", async function (req, res) {
  try {
    const workType = req.params.workType;

    if (workType == "chef" || workType == "waiter" || workType == "manager") {
      const response = await Person.find({ work: workType });
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: "Invalid work type" });
    }
  } catch (error) {
    console.error("Error fetching persons by work type:", error);
    res.status(500).json({ error: "Failed to fetch persons by work type" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;
    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, // return the updated document
        runValidators: true, // run mongoos validation
      }
    );

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch persons" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    res.status(200).json({ message: "Person deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch persons" });
  }
});

module.exports = router;

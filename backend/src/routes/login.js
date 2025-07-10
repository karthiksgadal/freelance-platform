const express = require("express");        
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/User.js"); 
const bcrypt = require("bcryptjs");        

router.post('/login',async (req,res) => {

    const { email, password } = req.body;
    try {
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({ error : "User not found"})
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({error:"Invalid Credentials"})
        }
        else if(isMatch){
            
            const token = jwt.sign(
                {id:user._id, role:user.role},
                process.env.JWT_SECRET,
                {expiresIn:"1h"}
            )
            res.status(200).json({
  message: "Login successful",
  token
});


        }
        
    } catch (err) {
        res.status(500).json({error:err.message});
        
    }
  
}
)
 
module.exports = router;


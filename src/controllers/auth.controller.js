const bcrypt = require('bcrypt')

const User = require('../model/user.model')

// controller for User account registering 
exports.registerUser = async (req,res) =>{
    try{
        const user =  new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        return res.status(201).json({user,token})
    }
    catch(err){
        return res.status(500).json({msg:err.message})
    }
}

// login controller 
exports.loginUser = async (req,res) =>{
    try{
        const user = await User.findOne({email:req.body.email})
        // cheking user email
        if(!user){
         return res.status(401).json({error: 'Invalid login credentials' })
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)
        
        if(!isPasswordMatch){
            return res.status(401).json({ error: 'Invalid login credentials' });
        }
        const token = await user.generateAuthToken()
        return res.status(200).json({user,token})
    }
    catch(err){
        return res.status(500).json({msg:err.message})
    }
}
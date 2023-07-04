const User = require('../models/User')
const router = require('express').Router();
const bcrypt = require('bcrypt')
 
//Update User 

router.put('/:id', async (req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }catch(err){
                res.status(500).json(err);
            }
        }

        try{
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body, 
            });
            res.status(200).json("Account has Been updated")
        }catch(err){
            res.status(500).json(err);
        }


    }else{
        res.status(403).json("You can only update your account");
    }
})

//Delete User


router.delete('/:id', async (req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        
        try{
            await User.findByIdAndDelete({_id : req.params.id});
            res.status(200).json("Account has Been Deleted Successfully")
        }catch(err){
            res.status(500).json(err);
        }


    }else{
        res.status(403).json("You can only delete your account");
    }
})


//Get User


router.get('/:id', async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password, updatedAt, ...other} = user._doc

        res.status(200).json(other);
    }catch(err){
        res.status(500).json(err);
    }
})

//Follow

router.put('/:id/follow', async(req,res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);

            const currUser = await User.findById(req.body.userId);

            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push:{ followers: req.body.userId}});
                await currUser.updateOne({$push:{ following: req.params.id}});

                res.status(200).json("User has been followed");
            }else{
                res.status(403).json("You allready follow user");
            }

        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You cannot follow yourself");
    }
})

//Unfollow


router.put('/:id/unfollow', async(req,res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);

            const currUser = await User.findById(req.body.userId);

            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull:{ followers: req.body.userId}});
                await currUser.updateOne({$pull:{ following: req.params.id}});

                res.status(200).json("User has been Unfollowed");
            }else{
                res.status(403).json("You allready Unfollow user");
            }

        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You cannot Unfollow yourself");
    }
})



module.exports = router
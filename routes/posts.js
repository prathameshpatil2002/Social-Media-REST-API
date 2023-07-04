const router = require('express').Router();
const Post = require('../models/Post');

//Create Post

router.post('/', async (req,res)=>{
    const newPost = new Post(req.body)

    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err);
    }
})


//Update Post

router.put('/:id', async (req,res)=>{
    const post = await Post.findById(req.params.id);

    if(post.userId === req.body.userId){
        try{
            await post.updateOne({$set:req.body});
            res.status(200).json("Post has been updated");
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You can update only your post");
    }
})

//Delete Post

router.delete('/:id', async (req,res)=>{
    const post = await Post.findById(req.params.id);

    if(post.userId === req.body.userId){
        try{
            await post.deleteOne({$set:req.body});
            res.status(200).json("Post has been Deleted");
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You can Delete only your post");
    }
})

//Like / Dislike Post

router.put('/:id/like', async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!(post).likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}});
            res.status(200).json("Post has been liked"); 
         }
         else{
             await post.updateOne({$pull:{likes:req.body.userId}});
             res.status(200).json("Post has been disliked");
         }
    }catch(err){
        res.status(500).json(err);
    }
})


//Get Post

router.get('/:id', async (req,res)=>{
    try{

        const post = await Post.findById(req.params.id);

        res.status(200).json(post);

    }catch(err){
        res.status(500).json(err);
    }
})


//Get Timeline Post

router.get('/timeline/all', async (req,res)=>{
    try{

        const currUser = await User.findById(req.body.userId);
        const userPosts = await Post.find({userId: currUser._id});
        const friendPosts = await Promise.all(
            currentUser.following.map(friendId => {
                return Post.find({userId: friendId});
            })
        );

        res.json(userPosts.concat(...friendPosts));

    }catch(err){
        res.status(500).json(err);
    }
})


module.exports = router;
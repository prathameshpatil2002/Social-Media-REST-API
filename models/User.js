const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username:{
        type:String,
        unique: true,
        required: true,
    },
    email:{
        type:String,
        unique:true,
        required: true,
    },
    password:{
        type:String,
        required: true,
    },
    profilePic:{
        type:String,
        default:""
    },
    coverPic:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    desc:{
        type:String,
        max:50
    },
    city:{
        type:String,
        max:50
    },
    from:{
        type:String,
        max:50
    },
    relationship:{
        type:String,
        enum:[1,2,3]
    },
},
{timestamps:true}
);

module.exports = model('User', UserSchema);
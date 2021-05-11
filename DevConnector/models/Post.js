const mongoose =require('mongoose');

const PostSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    text:{
        type:String,
        required:true,
        trim:true
    },
    name:{
        type:String,
        trim:true
    },
    avatar:{
        type:String
    },
    likes:[
        {
            users:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'user'
            }
        }
    ],
    comments:[
        {
            users:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'user'
            },
            text:{
                type:String,
                trim:true,
                required:true
            },
            name:{
                type:String,
                trim:true
            },
            avatar:{
                type:String
            },
            date:{
                type:Date,
                default:Date.now
            }
        }
    ],
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = Post = mongoose.model('post',PostSchema);
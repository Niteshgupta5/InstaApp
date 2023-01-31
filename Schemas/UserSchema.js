//Require Mongoose
import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
  username:{
    type: String,
    required: true,
    unique: true
  },
  profile: {
    type: String,
    required: true,
    default: "/assets/images/profilepic.webp"
  },
  city: {
    type: String,
    required: true,
    default: "city"
  },
  totalpost :
    {
        type: Number,
        required: true,
        default: 0
    },
  totalfollowers :
    {
        type: Number,
        required: true,
        default: 0
    },
  totalfollowing :
    {
        type: Number,
        required: true,
        default: 0
    },
    about :
    {
        type: String,
        required: true,
        default: "about"
    },
    followerslist:[
      {
        follower: {
          type: String,
          required: true,
        },
        followerprofile: {
          type: String,
          required: true,
        }
      }
     ],
     followinglist:[
      {
        followingto: {
          type: String,
          required: true,
        },
        followingprofile: {
          type: String,
          required: true,
        }
      }
     ],
     likelist:[
      {
        postid:{
          type: String,
          required: true,
        }
      }
     ],
     chatlist:[
      {
        sender:{
          type: String,
          required: true,
        },
        senderprofile:{
          type: String,
          required: true,
        },
        receiver:{
          type: String,
          required: true,
        },
        message:{
          type: String,
          required: true,
        },
        time: String
      }
     ]
});

// compile schema to model
const UserSchemaModel = mongoose.models.usersdetails || mongoose.model('usersdetails', UserSchema);
export default UserSchemaModel;
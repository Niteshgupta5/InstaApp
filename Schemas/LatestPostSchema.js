//Require Mongoose
import mongoose from 'mongoose';
const { Schema } = mongoose;

const LatestPostSchema = new Schema({
     postedby: {
       type: String,
       required: true,
     },
     userprofile: {
      type: String,
      required: true
    },
     media: {
       type: String,
       required: true
     },
     desc: {
       type: String,
       required: true
     },
     time: String,
     likes: {
       type: Number,
       required: true,
       default: 0
     },
     likedby:[
      {
        username:{
          type: String,
          required: true,
        },
        time: String
      }
     ],
     comments: {
       type: Number,
       required: true,
       default: 0
     },
     commentlist:[
      {
        comment: {
          type: String,
          required: true,
        },
        commentby: {
          type: String,
          required: true,
        },
        commenterprofile:{
          type: String,
          required: true,
        },
        time: String
      }
     ]
   });

// compile schema to model
const LatestPostSchemaModel = mongoose.models.latestposts || mongoose.model('latestposts', LatestPostSchema);
export default LatestPostSchemaModel;
//Require Mongoose
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs/dist/bcrypt.js';
const { Schema } = mongoose;

const RegisterSchema = new Schema({
  firstname:{
    type: String,
    required: true
  },
  lastname:{
    type: String,
    required: true
  },
  username:{
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true
  },
  tokens :[
    {
      token:{
        type: String,
        required: true
      },
      time: String
    }
  ],
  otps :[
    {
      code:{
        type: String,
        required: true
      },
      expire: Number,
    }
  ]
});


RegisterSchema.pre('save', async function(next){
  if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password,10);
  }
  next();
});



// compile schema to model
const RegisterSchemaModel = mongoose.models.users || mongoose.model('users', RegisterSchema);
export default RegisterSchemaModel
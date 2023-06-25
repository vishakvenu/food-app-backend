import mongoose,{ Schema } from "mongoose";

export interface UserData extends Document {
    name: string;
    email: string;
  }
  
  const userSchema: Schema = new Schema({
    name: { type: String, required: true },
    number: { type: Number, required: true },
    email: { type: String, required: true },
    password:{type:String,required:true}
  });
  
  export default mongoose.model<UserData>('User', userSchema);
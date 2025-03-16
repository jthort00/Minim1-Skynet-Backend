// src/models/user_models.ts
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName :{type: String, required : true },
    email: { type : String, required : true},
    password: { type:String, required: true},
    friends : [{type:mongoose.Types.ObjectId}],
    isDeleted: { type: Boolean, default: false } // borrado lógico
});

export interface IUser{
    isactive:boolean; //is active true by default
    userName : string;
    email : string;
    //List<Dron> drons: string;
    friends?: mongoose.Types.ObjectId[];
    isDeleted?: boolean;
}

const User = mongoose.model('User', userSchema);
export default User;

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName :{type: String, required : true },
    email: { type : String, required : true},
    password: { type:String, required: true},
    friends : [{type:mongoose.Types.ObjectId}]
});

export interface IUser{
    isactive:boolean; //is active true by default
    userName : string;
    email : string;
    //List<Dron> drons: string;
    friends?: mongoose.Types.ObjectId[];
}

const User = mongoose.model('User', userSchema);
export default User;

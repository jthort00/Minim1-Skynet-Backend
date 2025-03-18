// src/models/user_models.ts
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName :{type: String, required : true },
    email: { type : String, required : true},
    password: { type:String, required: true},
    friends : [{type:mongoose.Types.ObjectId}],
    isDeleted: { type: Boolean, default: false }, // borrado lógico
    role: { type : String,
            enum : ['Administrador', 'Usuario', 'Empresa', 'Gobierno'],
            required : true
    }
});

export interface IUser{
    isactive:boolean; //is active true by default
    userName : string;
    email : string;
    //List<Dron> drons: string;
    friends?: mongoose.Types.ObjectId[];
    isDeleted?: boolean;
    role: 'Administrador' | 'Usuario' | 'Empresa' | 'Gobierno';
}

const User = mongoose.model('User', userSchema);
export default User;

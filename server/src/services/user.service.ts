import User, { IUserInput } from "../models/User.js";
import bcrypt from "bcrypt";

export const createUserService = async (userData: IUserInput) => {
    if (await User.findOne({email: userData.email})) throw new Error("Email already exists.")
    if (await User.findOne({username: userData.username})) throw new Error("Username already exists.")

    const hashedPassword = await bcrypt.hash(userData.password, 10)
    
    const newUser = await User.create({
        ...userData,
        password: hashedPassword
    })
    
    return newUser 
};
import bcrypt from "bcrypt";
import { AuthData } from "controllers/auth.controller.js";
import User from "models/User.js";

export const authService = async(data: AuthData) => {
    const user = await User.findOne({ 
        $or: [
            { username: data.login },
            { email: data.login } 
        ]
    })

    if (!user) throw new Error("User not found.");

    const match = await bcrypt.compare(data.password, user.password);

    if (!match) throw new Error("Invalid password");

    return user;
}
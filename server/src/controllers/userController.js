import User from "../models/User.js";

export const createUser = async (req,res) => {
    try {
        const { username, email, password, firstName, lastName, isStudent } = req.body;

        const newUser = await User.create({
            username,
            email,
            password,
            firstName,
            lastName,
            isStudent
        });

        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}
import User from "../models/User.js";

export const createUserService = async (userData) => {
    const { username, email, password, firstName, lastName, isStudent } = userData;

    const newUser = await User.create({
        username,
        email,
        password,
        firstName,
        lastName,
        isStudent
    });

    return newUser;
}
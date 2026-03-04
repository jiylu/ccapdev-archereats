import User, { IUser, IUserInput } from "../models/User.js";

export const createUserService = async (userData: IUserInput): Promise<IUser> => {
    const newUser = await User.create(userData);
    return newUser;
};
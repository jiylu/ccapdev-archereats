import { Request, Response } from "express";
import { authSchema } from "schemas/auth.schemas.js"
import { authService } from "services/auth.service.js"
import { logger } from "utils/logger.js";
import { ZodError } from "zod";
import jwt from 'jsonwebtoken';


export interface AuthData {
    login: string,
    password: string
}

// expects login not username or password
export const loginUser = async (req: Request<object, object, AuthData>, res: Response) => {
    logger.info("POST auth called", {body: req.body})

    try {
        const validatedData = authSchema.parse(req.body);
        const userData = await authService(validatedData);
        
		if (!userData) {
			logger.error("Invalid login")
            return res.status(401).json({ message: "Invalid login" });
        }
        
        const { password: _, ...user } = userData.toObject();

        const token = jwt.sign(
            { id: user._id, login: req.body.login},
            process.env.JWT_SECRET || 'secret'
        )

        logger.info("Auth successful for", { user })
        res.status(200).json({ token, user })
    } catch (err: unknown) {
		if (err instanceof ZodError) {
			logger.error(err.issues)
            return res.status(400).json({ message: err.issues.map(issue => issue.message) });
        }

		if (err instanceof Error) {
			logger.error(err.message)
            return res.status(400).json({ message: err.message });
        }

        return res.status(500).json({ message: "Unknown error occured" });
    }
}

import { Request, Response } from "express";
import { authSchema } from "schemas/auth.schemas.js"
import { authService } from "services/auth.service.js"
import { logger } from "utils/logger.js";
import { ZodError } from "zod";

export interface AuthData {
    login: string,
    password: string
}

// expects login not username or password
export const loginUser = async (req: Request<object, object, AuthData>, res: Response) => {
    logger.info("POST auth called", {body: req.body})

    try {
        const validatedData = authSchema.parse(req.body);
        const user = await authService(validatedData);

        const { password: _, ...safeUser } = user.toObject();
        logger.info("Auth successful for", { safeUser })
        res.status(200).json(safeUser)
    } catch (err: unknown) {
        if (err instanceof ZodError) {
            return res.status(400).json({ message: err.issues.map(issue => issue.message) });
        }

        if (err instanceof Error) {
            res.status(400).json({ message: err.message });
        }

        res.status(500).json({ message: "Unknown error occured" });
    }
}

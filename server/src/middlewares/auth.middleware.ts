import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { logger } from 'utils/logger.js';

export interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
}


export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const header = req.headers['authorization']
    const token = req.cookies?.token ?? (header && header.split(' ')[1])

    logger.info("authMiddleware called.", {header: header, token: token})

    if (!token) {
        logger.warn("Access denied.", {header: header, token: token})
        return res.status(401).json({ message: "Access denied. No token provided." })
    }

    try {
        if (!process.env.JWT_SECRET) {
            logger.error("JWT_SECRET is not defined in .env")
            throw new Error('JWT_SECRET is not defined in environment variables');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
        const user = decoded as JwtPayload;
        
        if (!user.id) {
            logger.error("Invalid token payload")
            return res.status(403).json({ message: "Invalid token payload" });
        }
        
        req.user = user;
        logger.info("authMiddleware successfully verified", {header: header, token: token, user: user})
        next();
    } catch (err: unknown) {
        return res.status(403).json({ message: "Invalid or expired token " + err })
    }
}
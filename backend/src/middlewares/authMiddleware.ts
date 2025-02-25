import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateJWT = (req: any, res: Response, next: NextFunction): any => {
    const token = req.cookies.token;
    const authHeader = req.headers.authorization;

    if (!token || !authHeader) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Forbidden' });
    }
}
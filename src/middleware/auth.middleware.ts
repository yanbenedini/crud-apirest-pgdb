import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    userId?: number;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ error: 'Token de acesso requerido' });
    }

    const secret = process.env.JWT_SECRET || 'seu-secret-key-aqui-mude-em-producao';

    jwt.verify(token, secret, (err: any, decoded: any) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido ou expirado' });
        }

        req.userId = decoded.userId;
        next();
    });
};


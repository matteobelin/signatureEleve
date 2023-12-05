import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';
const publicKeyPath = './config/publicKey.pem';

export function verifToken(req: Request & { decoded?: any }, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')){
        const token = authorizationHeader.slice(7);

        fs.readFile(publicKeyPath, 'utf8', (err, publicKey) => {
            if (err) {
                res.status(500).send('Une erreur inattendue s\'est produite');
                return;
            }
        
            jwt.verify(token, publicKey, (jwtErr, decoded) => {
              if (jwtErr) {
                res.status(401).send('Token invalide');
                return;
              }
              req.decoded=decoded;
              next();
            })
        }
        )
    }
    else{
        res.status(401).send('Token invalide');
    }
}

export function accesAdmin(req: Request & { decoded?: any }, res: Response, next: NextFunction) {
    const decoded=req.decoded;
    if(decoded.role!=='admin'){
        res.status(400).send('Vous n\'avez pas acces');
        return;
    }
    next();
}

export function accesStudent(req: Request & { decoded?: any }, res: Response, next: NextFunction) {
    const decoded=req.decoded;
    if(decoded.role!=='student'){
        res.status(400).send('Vous ne pouvez pas signer a la place d\' un eleve');
        return;
    }else{
        next();
    }
    
}
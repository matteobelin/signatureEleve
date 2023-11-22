import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import { db } from '../config/models';

const privateKeyPath = './config/privateKey.pem'
const loginRoute = express.Router();

loginRoute.post("/login",async(req: Request, res: Response)=> {
  try {
    
    await db.read();
    const userFound = db.data.user.find(user => user.email === req.body.email);

    if (!userFound) {
      return res.status(401).send('Identifiants incorrects');
    }

    const passwordMatch = await bcrypt.compare(req.body.password, userFound.password);
    if (!passwordMatch) {
      return res.status(401).send('Identifiants incorrects');
    }

    fs.readFile(privateKeyPath, 'utf8', (err, privateKey) => {
      if (err) {
        console.error('Erreur lors de la lecture de la clé privée :', err);
        return res.status(500).send('Une erreur inattendue s\'est produite');
      }

      const token = jwt.sign({ id: userFound.id, role: userFound.role }, privateKey, { algorithm: 'RS256' });
      res.set('Authorization', 'Bearer ' + token);
      res.status(200).send('Connexion réussie');
    });
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    res.status(500).send('Une erreur inattendue s\'est produite');
  }
})

export default loginRoute;
import express, { Request, Response } from 'express';
import { db } from '../config/models';
import { verifToken } from '../middleware/middleware';
const get_user = express.Router();

get_user.get("/user",verifToken,async(req: Request & { decoded?: any }, res: Response)=> {
  try {
    await db.read();
    let user=db.data.user.find(user=>user.id===req.decoded.id);
    if (user) {
      const { email, role } = user;
      res.send({ email, role });
    }

    
    
  }catch (error) {
    console.error('Erreur lors de la connexion :', error);
    res.status(500).send('Une erreur inattendue s\'est produite');
  }
})

export default get_user;
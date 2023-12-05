import express, { Request, Response } from 'express';
import { verifToken } from '../middleware/middleware';
const get_access = express.Router();

get_access.get("/access",verifToken,async(req: Request & { decoded?: any }, res: Response)=> {
  try {
    
    if(req.decoded.role==='admin'){
        res.send({'access': ['add student', 'add course', 'add student at course']});
    }else{
        res.send({'access': ['course list']})
    }
      
    
  }catch (error) {
    console.error('Erreur lors de la connexion :', error);
    res.status(500).send('Une erreur inattendue s\'est produite');
  }
})

export default get_access;
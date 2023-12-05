import express, { Request, Response } from 'express';
import { db } from '../config/models';
import { verifToken,accesAdmin } from '../middleware/middleware';
const get_student = express.Router();

get_student.get("/student",verifToken,accesAdmin,async(req: Request , res: Response)=> {
  try {
    await db.read();
    let i=0
    let student:{id:number;email:string}[] =[]
    while(i<(db.data.user.length)){
        if(db.data.user[i].role==='student'){
            const{id,email}=db.data.user[i]
            student.push({id,email})
        }
        i++;
    }
    
    res.send({students:student});
    
  }catch (error) {
    console.error('Erreur lors de la connexion :', error);
    res.status(500).send('Une erreur inattendue s\'est produite');
  }
})

export default get_student;
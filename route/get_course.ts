import express, { Request, Response } from 'express';
import { db } from '../config/models';
import { verifToken,accesAdmin } from '../middleware/middleware';
const get_course = express.Router();

get_course.get("/course",verifToken,accesAdmin,async(req: Request , res: Response)=> {
  try {
    await db.read();
    let i=0
    let course:{ id:number;title: string; date: string; time: string; }[] = [];  
    while (i < db.data.course.length) {
        const { id,title, date, time } = db.data.course[i];
        course.push({id,title,date,time})
        i++;
    }
    
    res.send({ courses: course });
    
  }catch (error) {
    console.error('Erreur lors de la connexion :', error);
    res.status(500).send('Une erreur inattendue s\'est produite');
  }
})

export default get_course;
import express, { Request, Response } from 'express';
import { db } from '../config/models';
import { verifToken, accesStudent } from '../middleware/middleware';
const get_student_course = express.Router();

get_student_course.get("/student_course",verifToken,accesStudent,async(req: Request & { decoded?: any } , res: Response)=> {
  try {
    await db.read();
    let student_course:{ id:number;title: string; date: string; time: string;signedAt_date ?: string | null;signedAt_time?:string | null}[] = [];  
    const userFound =  db.data.students_courses.filter(user => user.id_user === req.decoded.id);
    if(userFound.length !== 0){
        userFound.forEach(user =>{
            let courseFound= db.data.course.find(course=>course.id===user.id_course)
            if(courseFound){
                let {id,title,date,time}=courseFound;
                let {signedAt_date,signedAt_time}=user
                student_course.push({id,title,date,time,signedAt_date,signedAt_time});
            }  
        }
        )
        res.send({student_courses:student_course})
    }
    else{
        res.send({student_courses:"Ne fait partie d\'aucun cours"});
    }
    
    
  }catch (error) {
    console.error('Erreur lors de la connexion :', error);
    res.status(500).send('Une erreur inattendue s\'est produite');
  }
})

export default get_student_course;
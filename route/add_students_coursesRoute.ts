import express, { Request, Response } from 'express';
import { db } from '../config/models';
import { verifToken, accesAdmin } from '../middleware/middleware';

const addStudentsCoursesRoute = express.Router();

addStudentsCoursesRoute.post('/add_students_courses', verifToken, accesAdmin, async (req: Request, res: Response) => {
  try {
    await db.read();
    const userFound = db.data.user.find(user => user.id === req.body.id_user);
    const courseFound = db.data.course.find(course => course.id === req.body.id_course);
     if(db.data.students_courses.findIndex(relation => relation.id_course === req.body.id_course && relation.id_user === req.body.id_user)!==-1)
     {
      res.status(400).send('Deja ajouté au cours');
      return;
    }

    
    if (userFound && courseFound) {
      if (db.data && db.data.students_courses && Array.isArray(db.data.students_courses)) {
        const newRelation = {
          id_course: req.body.id_course,
          id_user: req.body.id_user,
          registeredAt: new Date().toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }),
          signedAt_date: null,
          signedAt_time: null,
        };

        db.data.students_courses.push(newRelation);
        await db.write();

        res.status(200).send("Élève ajouté au cours avec succès");
      } else {
        console.error("La structure de la base de données est incorrecte ou le tableau 'students_courses' est vide.");
        res.status(500).send("Erreur interne du serveur");
      }
    } else {
      console.error("Cours ou utilisateur inexistant");
      res.status(400).send("Erreur : cours ou utilisateur inexistant");
    }
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});

export default addStudentsCoursesRoute;
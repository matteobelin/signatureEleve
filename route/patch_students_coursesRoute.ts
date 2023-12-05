import express, { Request, Response } from 'express';
import { db } from '../config/models';
import { verifToken, accesStudent } from '../middleware/middleware';

const patchStudentsCoursesRoute = express.Router();

patchStudentsCoursesRoute.patch('/patch_students_courses', verifToken, accesStudent, async (req: Request & { decoded?: any }, res: Response) => {
  try {
    
    await db.read();
    const userFound = db.data.user.find(user => user.id === req.decoded.id);
    const courseFound = db.data.course.find(course => course.id === req.body.id_course);

    if (userFound && courseFound && db.data.students_courses && Array.isArray(db.data.students_courses)) {
      const existingRelationIndex = db.data.students_courses.findIndex(
        relation => relation.id_course === req.body.id_course && relation.id_user === req.decoded.id
      );

      if (existingRelationIndex !== -1) {
        if(db.data.students_courses[existingRelationIndex].signedAt_date!==null){
          res.status(400).send("Deja signé");
          return;
        }
        let date=new Date().toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
        if(date!==courseFound.date){
          res.send("Impossible de signer le cours un autre jours")
          return;
        }

        db.data.students_courses[existingRelationIndex].signedAt_date = date;
        db.data.students_courses[existingRelationIndex].signedAt_time = new Date().toLocaleString('fr-FR', { hour: '2-digit', minute: '2-digit' });

        // Écriture dans la base de données
        await db.write();
        res.status(200).send("Élève a signé le cours avec succès");
      } else {
        res.status(400).send("La relation n'existe pas");
      }
    } else {
      console.error("L'élève, le cours ou la structure de la base de données est incorrecte.");
      res.status(400).send("Erreur : l'élève, le cours ou la structure de la base de données est incorrecte");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur interne du serveur");
  }
});

export default patchStudentsCoursesRoute;
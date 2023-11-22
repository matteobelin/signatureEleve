import express, { Request, Response } from 'express';
import { db } from '../config/models';
import { verifToken, accesAdmin } from '../middleware/middleware';
import { courseSchema } from '../app/validation';

const addCourseRoute = express.Router();

addCourseRoute.post("/add_course", verifToken, accesAdmin, async (req: Request, res: Response) => {
  try {
    await db.read();
    if (db.data && db.data.course && Array.isArray(db.data.course)) {
      const LastCourse = db.data.course[db.data.course.length - 1];
      const id = LastCourse ? LastCourse.id + 1 : 1;
      const data = await courseSchema.validate(req.body, { stripUnknown: true });
      db.data.course.push({ id: id, ...data });
      await db.write();

      res.status(200).send("Cours ajouté avec succès");
    } else {
      console.error("La structure de la base de données est incorrecte ou le tableau 'course' est vide.");
      res.status(500).send("Erreur interne du serveur");
    }
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});

export default addCourseRoute;
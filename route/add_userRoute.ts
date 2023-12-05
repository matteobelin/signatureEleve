import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { db } from '../config/models';
import { verifToken, accesAdmin } from '../middleware/middleware';
import { userSchema } from '../app/validation';

const saltRounds = 10;


const addUserRoute = express.Router();

addUserRoute.post("/add_user", verifToken, accesAdmin, async (req: Request, res: Response) => {
  try {

    await db.read();
    if (db.data && db.data.user && Array.isArray(db.data.user)) {

      if (db.data.user.find(user => user.email === req.body.email)) {
        res.status(400).send("Email déjà utilisé");
        return;
      }
      const LastPerson = db.data.user[db.data.user.length - 1];
      const id = LastPerson ? LastPerson.id + 1 : 1;
      req.body.password = await bcrypt.hash(req.body.password, saltRounds);
      let data = await userSchema.validate(req.body, { stripUnknown: true });
      if (data["role"] === "student" || data["role"] === "admin") {
        db.data.user.push({ id: id, ...data });
        await db.write();
        res.status(200).send("Personne ajoutée avec succès");
      } else {
        res.status(400).send("Le rôle spécifié n'est pas valide");
        return;
      }
    } else {
      console.error("La structure de la base de données est incorrecte ou le tableau 'user' est vide.");
    }

  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});


export default addUserRoute;
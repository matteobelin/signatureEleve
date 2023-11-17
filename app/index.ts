import express from 'express';
import { Low } from "lowdb";
import { JSONFile } from 'lowdb/node';
import { userSchema } from './validation';


type Data = {
  user: user[],
  }

interface user{
    id:number;
    email:string;
    password:string;
    role:string;
  }

const defaultData: Data = { user: [] }
const adapter = new JSONFile<Data>('db.json')
const db = new Low<Data>(adapter, defaultData)
const app: express.Application = express();
const port: number = 3000
db.read();




app.use(express.json());


app.post("/add_user",async(req,res)=>{
    try {
        await db.read();
        if (db.data && db.data.user && Array.isArray(db.data.user)) {
            const LastPerson = db.data.user[db.data.user.length - 1];
            const id = LastPerson ? LastPerson.id + 1 : 1;
            let data = await userSchema.validate(req.body, { stripUnknown: true });

            if (data["role"] === "student" || data["role"] === "admin") {
                db.data.user.push({ id: id, ...data });
                await db.write();
                res.status(200).send("Personne ajoutée");
            } else {
            res.status(400).send("Le rôle spécifié n'est pas valide");
        }
            
        } else {
            console.error("La structure de la base de données est incorrecte ou le tableau 'persons' est vide.");
        }
        
        
    } catch (err) {
        console.error(err);
        res.status(400).send(err);
    }
});




app.listen(port, () => {

    console.log(`Server is Fire at http://localhost:${port} `);
});
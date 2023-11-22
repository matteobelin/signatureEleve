import express, { NextFunction,Request, Response } from 'express';
import loginRoute from "../route/loginRoute";
import addCourseRoute from "../route/add_courseRoute";
import addUserRoute from "../route/add_userRoute";
import addStudentsCoursesRoute from "../route/add_students_coursesRoute"
import patchStudentsCoursesRoute from "../route/patch_students_coursesRoute"


const app: express.Application = express();
const port: number = 3000

app.use(express.json());

app.use(loginRoute);
app.use(addCourseRoute);
app.use(addUserRoute);
app.use(addStudentsCoursesRoute);
app.use(patchStudentsCoursesRoute);



app.listen(port, () => {

    console.log(`Server is Fire at http://localhost:${port} `);
});
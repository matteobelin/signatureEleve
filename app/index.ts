import express from 'express';
import loginRoute from "../route/loginRoute";
import addCourseRoute from "../route/add_courseRoute";
import addUserRoute from "../route/add_userRoute";
import addStudentsCoursesRoute from "../route/add_students_coursesRoute"
import patchStudentsCoursesRoute from "../route/patch_students_coursesRoute"
import get_user from "../route/get_user";
import get_access from "../route/get_access"
import get_student from "../route/get_student"
import get_course from "../route/get_course"
import get_student_course from "../route/get_student_course"


const app: express.Application = express();
const port: number = 3000

app.use(express.json());

app.use(get_student_course)
app.use(get_course)
app.use(get_student)
app.use(get_access)
app.use(get_user);
app.use(loginRoute);
app.use(addCourseRoute);
app.use(addUserRoute);
app.use(addStudentsCoursesRoute);
app.use(patchStudentsCoursesRoute);



app.listen(port, () => {

    console.log(`Server is Fire at http://localhost:${port} `);
});
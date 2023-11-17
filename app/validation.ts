import { object, string, number } from 'yup';

let userSchema = object({
    email:string().email().required().trim().strict(),
    password: string().required().trim().strict(),
    role: string().required().trim().strict(),
  });
  export{userSchema}
import { object, string, date} from 'yup';

let userSchema = object({
    email:string().email().required().trim().strict(),
    password: string().required().trim().strict(),
    role: string().required().trim().strict(),
  });

let courseSchema=object({
    title:string().required().trim().strict(),
    date:string().required().strict().matches(/(\d{2})\/(\d{2})\/(\d{4})/),
    time:string().required().matches(/([01]\d|2[0-3]):([0-5]\d)/),
  });
  export{userSchema,courseSchema}
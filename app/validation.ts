import { object, string} from 'yup';

let userSchema = object({
    email:string().email().required().trim().strict(),
    password: string().required().trim().strict(),
    role: string().required().trim().strict(),
  });

let courseSchema=object({
    title:string().required().trim().strict(),
    date:string().required().strict().matches(/(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})/),
    time:string().required().matches(/([01]\d|2[0-3]):([0-5]\d)/),
  });
  export{userSchema,courseSchema}
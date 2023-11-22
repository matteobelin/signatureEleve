import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

export interface Data {
  user: User[];
  course: Course[];
  students_courses: StudentsCourses[];
}

export interface User {
  id: number;
  email: string;
  password: string;
  role: string;
}

export interface Course {
  id: number;
  title: string;
  date: string;
  time: string;
}

export interface StudentsCourses {
  id_course: number;
  id_user: number;
  registeredAt?: string;
  signedAt_date?: string | null;
  signedAt_time?: string | null;
}

 const defaultData: Data = { user: [], course: [], students_courses: [] };
 const adapter = new JSONFile<Data>('db.json');
export const db = new Low<Data>(adapter, defaultData);
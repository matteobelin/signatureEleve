import React from 'react';
import { useState,useEffect } from 'react';
const AddStudentCourse = () =>{

    const [student,setStudent]=useState(<input value="Pas d'élève" readOnly />)
    const [course,setCourse]=useState(<input value="Pas de cours" readOnly />)

    const checkAuthorization = async () => {
        const authorizationCookie = getCookieValue('authorization');
        if (authorizationCookie) {
          try {
            const response = await fetch('/api/student', {
              method: 'get',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `${authorizationCookie}`,
              },
              
            });
            const response_course =await fetch('/api/course', {
                method: 'get',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `${authorizationCookie}`,
                },
                
              });
    
            if (response.ok && response_course.ok) {
              const data = await response.json();
              const data_course=await response_course.json()
              setCourse(
                <select name="id_course" id="id_course">
                {data_course.courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}, le {course.date} à {course.time}
                  </option>
                ))}
              </select>
              )
              setStudent(
                <select name="id_user" id="id_user">
                {data.students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.email}
                  </option>
                ))}
              </select>)  
          }else {
                navigate('/login');
                return null;
            }
          } catch (error) {
            console.error('Erreur lors de la requête', error);
          }
        } else {
            navigate('/login');
            return null;
        }
      };
      useEffect(() => {
        checkAuthorization();
      }, []);

      const getCookieValue = (name) => {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.startsWith(`${name}=`)) {
            return decodeURIComponent(cookie.substring(name.length + 1));
          }
        }
        return null;
      };

    const handleSubmit =async(event)=>{

        event.preventDefault();

        const id_course = event.target.elements.id_course.value;
        const id_user = event.target.elements.id_user.value;

    try {
      const authorizationCookie = getCookieValue('authorization');
      const response = await fetch('/api/add_students_courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${authorizationCookie}`,
        },
        body: JSON.stringify({ id_course, id_user }),
      });

      if (response.ok) {
        window.alert('Eleve ajouté au cours avec succès');
        event.target.reset();
      } else {
        console.error('Échec de la connexion');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion', error);
    }

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="Eleve">Elève :</label>
                    {student}
                </div>
                <div>
                    <label htmlFor="cours">Cours :</label>
                    {course}
                </div> 
            <button type="submit">Envoyer</button>
          </form>
        </div>
      );
}



export default AddStudentCourse;
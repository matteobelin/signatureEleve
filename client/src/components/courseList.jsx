import { useState,useEffect } from "react";
import React from 'react';
import SignButton from "./signButton";
const CourseList = () =>{

    let date=new Date().toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
    const listElement=[];
    const [listData, setListData] = useState([]);
    const obtenirValeurCookie = (nom) => {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.startsWith(`${nom}=`)) {
            return decodeURIComponent(cookie.substring(nom.length + 1));
          }
        }
        return null;
      };
    
      const List = async () => {
        const authorizationCookie = obtenirValeurCookie('authorization');
        if (authorizationCookie) {
          try {
            const response = await fetch('/api/student_course', {
              method: 'get',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `${authorizationCookie}`,
              },
            });
    
            if (response.ok) {
              const data = await response.json();
              setListData(data.student_courses)  
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
        List()
        const intervalId = setInterval(() => {
          List();  
        }, 30000);
        return () => clearInterval(intervalId);
      }, []);


      if(typeof listData==='string'){
        listElement.push(listData);
      }else{
        let i=0
        while(listData[i]!=undefined){
            listElement.push(
                <div key={i}>
                    <h3>{listData[i].title}</h3>
                    <p>{listData[i].date}</p>
                    <p>{listData[i].time}</p>
                    {listData[i].signedAt_date && listData[i].signedAt_time !== null ? (
                        <p>Signé</p>
                    ) : listData[i].date !== date ? (
                        <p>Non signé</p>
                    ) : (
                        <SignButton id_course={listData[i].id} Afficher={() => List()}/>
                    )}
                </div>
                
            )
            i++
        }
      }

    return (
        <div>
            {listElement}
        </div>
      );
}



export default CourseList;
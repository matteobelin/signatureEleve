import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Sidebar from "./sidebar"
import Content from "./content"


const Appli = () => {  
    const navigate = useNavigate();
    const [user,setUser]=useState("")
    const [role,setRole]=useState("")
    const [selectedItem, setSelectedItem] = useState("page accueil");

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
    
      const checkAuthorization = async () => {
        const authorizationCookie = obtenirValeurCookie('authorization');
        if (authorizationCookie) {
          try {
            const response = await fetch('/api/user', {
              method: 'get',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `${authorizationCookie}`,
              },
            });
    
            if (response.ok) {
              const data = await response.json();
              setUser(data.email)
              setRole(data.role)
            } else {
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
      const handleSidebarItemClick = (element) => {
        setSelectedItem(element)
      };
    return (
      <div className='flex'>
        <Sidebar onSidebarItemClick={handleSidebarItemClick} />
        <div className="content">
          <div className="flex">
              <p>{user}</p>
              <p>{role}</p>
          </div>
          <Content selectedItem={selectedItem}/>
        </div>
      </div>
    );
  };
  
  export default Appli;
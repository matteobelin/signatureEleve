import React from 'react';
import { useEffect,useState  } from 'react';

const Sidebar = ({onSidebarItemClick}) => {
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
    
      const checkAuthorization = async () => {
        const authorizationCookie = obtenirValeurCookie('authorization');
        if (authorizationCookie) {
          try {
            const response = await fetch('/api/access', {
              method: 'get',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `${authorizationCookie}`,
              },
            });
    
            if (response.ok) {
              const data = await response.json();
              setListData(data.access)  
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
      
        let i=0
        while(listData[i]!=undefined){
          const handleClick = (index) => {
            return () => {
              onSidebarItemClick(listData[index]);
            };
          };
          listElement.push(
            <li key={i} id={listData[i]} onClick={handleClick(i)}>
              {listData[i]}
            </li>
          );
            i++;  
                
    }

  return (
    <div>
        <nav>
            <ul>
            {listElement}
            </ul>
        </nav>
    </div>
  );
};

export default Sidebar;
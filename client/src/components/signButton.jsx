const SignButton=({id_course,Afficher}) => {
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

    const handleSign = async() =>{
            const authorizationCookie = obtenirValeurCookie('authorization');
            if (authorizationCookie) {
              try {
                const response = await fetch('/api/patch_students_courses', {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${authorizationCookie}`,
                  },
                  body: JSON.stringify({id_course}),
                });
        
                if (response.ok) {
                   Afficher()
              }else {
                    window.alert('impossible de signer')
                }
              } catch (error) {
                console.error('Erreur lors de la requête', error);
              }
            } else {
                navigate('/login');
                return null;
            }
          };


    return (
        <button onClick={handleSign}>Signer</button>
      );
}
export default SignButton
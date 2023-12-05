import React from 'react';
const AddStudent = () =>{
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const email = event.target.elements.email.value;
        const password = event.target.elements.password.value;
        const passwordConfirm = event.target.elements.passwordConfirm.value;
        const role = event.target.elements.role.value;

        if(password===passwordConfirm){
            if(role==='admin'||role==='student'){
                try {
                    const authorizationCookie = getCookieValue('authorization');
                    const response = await fetch('/api/add_user', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${authorizationCookie}`,
                      },
                      body: JSON.stringify({ email, password, role }),
                    });
              
                    if (response.ok) {
                      window.alert('Elève ajouté avec succès');
                      event.target.reset();
                    } else {
                      console.error('Échec de la connexion');
                    }
                  } catch (error) {
                    console.error('Erreur lors de la connexion', error);
                  }
            }else{
                console.log('role n\'existe pas')
            }
            
            }else{
                console.log('mdp different')
            }
        }
    
        
    
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
    
      return (
        <div>
          <form onSubmit={handleSubmit} className='form Add'>
            <div>
              <label htmlFor="email">Email de l'utilisateur</label>
              <input type="text" id="email" name="email" autoComplete="email" placeholder='Email' />
            </div>
            <div>
              <label htmlFor="password">Mot de Passe</label>
              <input type="password" id="password" name="password" autoComplete="password" placeholder='*********'/>
            </div>
            <div>
              <label htmlFor="passwordConfirm">Confirmation du Mot de Passe</label>
              <input type="password" id="passwordConfirm" name="passwordConfirm" autoComplete="password" placeholder='*********'/>
            </div>
            <div>
              <label htmlFor="role">Rôle de l'utilisateur</label>
              <select name="role" id="role">
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit">Envoyer</button>
          </form>
        </div>
      );
    };



export default AddStudent;
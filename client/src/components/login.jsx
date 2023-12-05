import { useNavigate } from 'react-router-dom';
import {useEffect } from "react";
const Login = () => {
  const navigate = useNavigate();

  function delCookie() {
    document.cookie = `authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  function enregistrerAuthorizationDansCookie(authorizationHeader) {
    if (authorizationHeader) {
      const expirationDays = 1;
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + expirationDays);
      document.cookie = `authorization=${encodeURIComponent(authorizationHeader)};expires=${expirationDate.toUTCString()};path=/`;
      console.log('Le jeton d\'autorisation a été enregistré dans le cookie avec succès.');
    } else {
      console.error('Le jeton d\'autorisation est vide ou non défini.');
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const authorizationHeader = response.headers.get('Authorization');
        enregistrerAuthorizationDansCookie(authorizationHeader);
        navigate('/');
        return null;
      } else {
        console.error('Échec de la connexion');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion', error);
    }
  };

  useEffect(() => {
    delCookie();
  }, []);

  return (
    <div class="login">
      <form onSubmit={handleSubmit} class="form">
        <p>Se connecter</p>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" autoComplete="email" placeholder='Email'/>
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input type="password" id="password" name="password" autoComplete="current-password" placeholder='************' />
        </div>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default Login;
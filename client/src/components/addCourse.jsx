import React from 'react';

const AddCourse = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const title = event.target.elements.title.value;
    const date = formatDate(event.target.elements.date.value);
    const time = event.target.elements.time.value;

    try {
      const authorizationCookie = getCookieValue('authorization');
      const response = await fetch('/api/add_course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${authorizationCookie}`,
        },
        body: JSON.stringify({ title, date, time }),
      });

      if (response.ok) {
        window.alert('Cours ajouté avec succès');
        event.target.reset();
      } else {
        console.error('Échec de la connexion');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion', error);
    }
  };

  const formatDate = (inputDate) => {
    const [year, month, day] = inputDate.split('-');
    return `${day}/${month}/${year}`;
  };

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
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Nom du cours</label>
          <input type="text" id="title" name="title" autoComplete="nom du cours" />
        </div>
        <div>
          <label htmlFor="date">Date du cours</label>
          <input type="date" id="date" name="date" autoComplete="date" />
        </div>
        <div>
          <label htmlFor="time">Heure du cours</label>
          <input type="time" id="time" name="time" autoComplete="time" />
        </div>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default AddCourse;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/login_check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: credentials.email, // Ou email si votre API utilise le champ email
            password: credentials.password,
          }),
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la connexion');
      }
      const data = await response.json();
      localStorage.setItem('token', data.token); // Stockez le token JWT
      localStorage.setItem('userId', data.user.id); // Supposons que l'API renvoie l'ID de l'utilisateur sous `data.user.id`
      localStorage.setItem('userRoles', JSON.stringify(data.user.role_user)); // Stockez les rôles de l'utilisateur
      navigate('/'); // Rediriger vers la page d'accueil après la connexion
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Mot de passe"
          required
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default SignIn;

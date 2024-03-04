import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    nom: '',
    prenom: '',
    phone: '',
    adresse: '',
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error('Erreur lors de l\'inscription');
      }
      navigate('/signin'); // Rediriger vers la page de connexion après l'inscription
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nom"
          value={user.nom}
          onChange={handleChange}
          placeholder="Nom"
          required
        />
        <input
          type="text"
          name="prenom"
          value={user.prenom}
          onChange={handleChange}
          placeholder="Prénom"
          required
        />
        <input
          type="tel"
          name="phone"
          value={user.phone}
          onChange={handleChange}
          placeholder="Téléphone"
        />
        <input
          type="text"
          name="adresse"
          value={user.adresse}
          onChange={handleChange}
          placeholder="Adresse"
        />
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Mot de passe"
          required
        />
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default SignUp;

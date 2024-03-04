// src/components/EditProfile.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const [user, setUser] = useState({
    nom: '',
    prenom: '',
    adresse: '',
    email: '',
    phone: '',
    password: '',
    // Ajoutez d'autres champs si nécessaire
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Ici, récupérez les informations de l'utilisateur pour les pré-remplir dans le formulaire
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      try {
        const response = await fetch(`http://localhost:8000/api/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setUser(data); // Supposons que l'API renvoie directement l'objet utilisateur
      } catch (error) {
        console.error("Erreur lors de la récupération des informations de l'utilisateur:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    try {
      const response = await fetch(`http://localhost:8000/api/utilisateurs/edit/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) throw new Error('Erreur lors de la modification du profil');
      console.log('Profil mis à jour avec succès');
      navigate('/profile'); // Redirigez l'utilisateur vers sa page de profil ou une autre page de confirmation
    } catch (error) {
      console.error('Erreur lors de la modification du profil:', error);
    }
  };

  return (
    <div>
      <h2>Modifier Profil</h2>
      <form onSubmit={handleSubmit}>
        {/* Créez des champs de formulaire pour chaque attribut de l'utilisateur */}
        <input type="text" name="nom" value={user.nom} onChange={handleChange} />
        <input type="text" name="prenom" value={user.prenom} onChange={handleChange} />
        <input type="text" name="adresse" value={user.adresse} onChange={handleChange} />
        <input type="email" name="email" value={user.email} onChange={handleChange} />
        <input type="text" name="phone" value={user.phone} onChange={handleChange} />
        <input type="password" name="password" value={user.password} placeholder="Nouveau mot de passe (laisser vide pour ne pas changer)" onChange={handleChange} />
        <button type="submit">Sauvegarder les modifications</button>
      </form>
    </div>
  );
};

export default EditProfile;

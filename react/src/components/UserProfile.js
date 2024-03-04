import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token non trouvé, redirection...');
      navigate('/signin'); // Redirige vers la page de connexion si le token n'est pas trouvé
      return;
    }

    fetch('http://localhost:8000/api/profile', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(response => response.json())
    .then(data => setUser(data))
    .catch(error => console.error("Erreur lors de la récupération des informations de l'utilisateur", error));
  }, [navigate]);

  const handleEdit = () => {
    navigate('/edit-profile'); // Remplacez '/edit-profile' par votre route de modification de profil
  };

  const handleDelete = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?")) {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId'); // Récupérez l'ID de l'utilisateur
      fetch(`http://localhost:8000/api/utilisateurs/delete/${userId}`, { // Utilisez cet ID dans l'URL
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la suppression du compte');
        }
        console.log("Compte supprimé");
        localStorage.removeItem('token'); // Supprime le token stocké
        localStorage.removeItem('userId'); // Supprimez également l'ID de l'utilisateur stocké
        navigate('/signin'); // Redirige vers la page de connexion après la suppression
      })
      .catch(error => console.error("Erreur lors de la suppression du compte", error));
    }
  };
  

  return (
    <div>
      <h2>Profil de l'Utilisateur</h2>
      <p>Nom: {user.nom}</p>
      <p>Prénom: {user.prenom}</p>
      <p>Email: {user.email}</p>
      <p>Adresse: {user.adresse}</p>
      <p>Téléphone: {user.phone}</p>
      <button onClick={handleEdit}>Modifier Profil</button>
      <button onClick={handleDelete}>Supprimer Compte</button>
    </div>
  );
};

export default UserProfile;

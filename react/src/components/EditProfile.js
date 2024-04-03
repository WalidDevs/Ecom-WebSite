// src/components/EditProfile.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
      toast.success('Profil mis à jour avec succès');
      navigate('/profile'); // Redirigez l'utilisateur vers sa page de profil ou une autre page de confirmation
    } catch (error) {
      toast.error('Erreur lors de la modification du profil:', error);
    }
  };

  return (
    <div className="bg-gray-900 flex flex-col items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Modifier Profil</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input className="w-full p-2 border border-gray-300 rounded" type="text" name="nom" value={user.nom} onChange={handleChange} placeholder="Nom" />
                    <input className="w-full p-2 border border-gray-300 rounded" type="text" name="prenom" value={user.prenom} onChange={handleChange} placeholder="Prénom" />
                    <input className="w-full p-2 border border-gray-300 rounded" type="text" name="adresse" value={user.adresse} onChange={handleChange} placeholder="Adresse" />
                    <input className="w-full p-2 border border-gray-300 rounded" type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" />
                    <input className="w-full p-2 border border-gray-300 rounded" type="text" name="phone" value={user.phone} onChange={handleChange} placeholder="Téléphone" />
                    <input className="w-full p-2 border border-gray-300 rounded" type="password" name="password" value={user.password} onChange={handleChange} placeholder="Nouveau mot de passe (laisser vide pour ne pas changer)" />
                    <button type="submit" className="w-full bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sauvegarder les modifications</button>
                </form>
            </div>
        </div>
  );
};


export default EditProfile;

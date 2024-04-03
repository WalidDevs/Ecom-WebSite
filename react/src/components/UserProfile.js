import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
        toast.success("Compte supprimé");
        localStorage.removeItem('token'); // Supprime le token stocké
        localStorage.removeItem('userId'); // Supprimez également l'ID de l'utilisateur stocké
        navigate('/signin'); // Redirige vers la page de connexion après la suppression
      })
      .catch(error => console.error("Erreur lors de la suppression du compte", error));
    }
  };
  

  return (
    <div className=" bg-gray-900 flex justify-center items-center min-h-screen w-full ">
            <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">Profil de l'Utilisateur</h2>
                <p className="text-md text-gray-600">Nom: {user.nom}</p>
                <p className="text-md text-gray-600">Prénom: {user.prenom}</p>
                <p className="text-md text-gray-600">Email: {user.email}</p>
                <p className="text-md text-gray-600">Adresse: {user.adresse}</p>
                <p className="text-md text-gray-600">Téléphone: {user.phone}</p>
                <div className="flex flex-wrap space-x-2 mt-4">
                    <button className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleEdit}> 
                        Modifier Profil
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleDelete}> 
                        Supprimer Compte
                    </button>
                </div>
            </div>
        </div>
  );
};

export default UserProfile;

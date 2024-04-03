// src/components/EditProduct.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  
  
  const [product, setProduct] = useState({
    titre: '',
    description: '',
    prix: '',
    image: ''
  });

  useEffect(() => {
    // Remplacez cette URL par votre endpoint API correct
    fetch(`http://localhost:8000/api/produits/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Erreur lors de la récupération du produit:', error));
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Remplacez cette URL par votre endpoint API correct pour la mise à jour
    fetch(`http://localhost:8000/api/produits/${id}/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Incluez d'autres headers si nécessaire, par exemple pour l'authentification
        'Authorization': `Bearer ${token}`, // Remplacez "yourToken" par le token JWT stocké
      },
      body: JSON.stringify(product),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du produit');
      }
      toast.success('Le produit est mis a jour !');
      navigate('/Product'); // Utilisez navigate pour rediriger après la mise à jour
    })
    .catch(error => toast.error('Erreur lors de la mise à jour du produit:', error));
  };

  return (
    <div className=" bg-gray-900 flex flex-col items-center justify-center min-h-screen w-full">
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4">
            <input
                type="text"
                name="titre"
                value={product.titre}
                onChange={handleInputChange}
                placeholder="Titre du produit"
                className="w-full max-w-md px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                name="description"
                value={product.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="w-full max-w-md px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                name="prix"
                value={product.prix}
                onChange={handleInputChange}
                placeholder="Prix"
                className="w-full max-w-md px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                name="image"
                value={product.image}
                onChange={handleInputChange}
                placeholder="URL de l'image"
                className="w-full max-w-md px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="w-full max-w-md bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Sauvegarder les modifications
            </button>
        </form>
        </div>
  );
};

export default EditProduct;

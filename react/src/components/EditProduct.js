// src/components/EditProduct.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
      navigate('/'); // Utilisez navigate pour rediriger après la mise à jour
    })
    .catch(error => console.error('Erreur lors de la mise à jour du produit:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="titre"
        value={product.titre}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="description"
        value={product.description}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="prix"
        value={product.prix}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="image"
        value={product.image}
        onChange={handleInputChange}
      />
      <button type="submit">Sauvegarder les modifications</button>
    </form>
  );
};

export default EditProduct;

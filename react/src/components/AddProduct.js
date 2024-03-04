import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [product, setProduct] = useState({
    titre: '',
    description: '',
    prix: '',
    image: '',
    categorie:'',
    // Si votre produit nécessite une catégorie, ajoutez-la ici
  });

  const categories = [
    { id: 1, name: 'Portables' },
    { id: 2, name: 'Ordinateurs' },
    // Ajoutez d'autres catégories ici
  ];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/produits/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        // Incluez d'autres headers si nécessaire, par exemple pour l'authentification
          'Authorization': `Bearer ${token}`, // Remplacez "yourToken" par le token JWT stocké
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la création du produit');
      }
      navigate('/'); // Rediriger vers la page principale après la création
    } catch (error) {
      console.error('Erreur lors de la création du produit:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>

<select
        name="categorie"
        value={product.categorie}
        onChange={handleInputChange}
      >
        <option value="">Sélectionnez une catégorie</option>
        {categories.map((categorie) => (
          <option key={categorie.id} value={categorie.id}>
            {categorie.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="titre"
        placeholder="Titre"
        value={product.titre}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={product.description}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="prix"
        placeholder="Prix"
        value={product.prix}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="image"
        placeholder="URL de l'image"
        value={product.image}
        onChange={handleInputChange}
      />
      <button type="submit">Ajouter le produit</button>
    </form>
  );
};

export default AddProduct;

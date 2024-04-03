import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
      toast.success('Produit crée avec succes');
      navigate('/Product'); // Rediriger vers la page principale après la création
    } catch (error) {
      toast.error('Erreur lors de la création du produit');
    }
  };

  return (
    <div className=" bg-gray-900 flex flex-col items-center justify-center min-h-screen w-full">
    <form onSubmit={handleSubmit} className="flex flex-col p-4 space-y-4 max-w-lg mx-auto">
            <select
                name="categorie"
                value={product.categorie}
                onChange={handleInputChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                name="description"
                placeholder="Description"
                value={product.description}
                onChange={handleInputChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                name="prix"
                placeholder="Prix"
                value={product.prix}
                onChange={handleInputChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                name="image"
                placeholder="URL de l'image"
                value={product.image}
                onChange={handleInputChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">
                Ajouter le produit
            </button>
        </form>
        </div>
  );
};

export default AddProduct;

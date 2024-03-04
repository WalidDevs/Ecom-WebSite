// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import './ProductList.css';
import { useParams, useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/signin');
  };
  
    // Récupérer les rôles de l'utilisateur depuis le localStorage
  const userRoles = JSON.parse(localStorage.getItem('userRoles') || '[]');
  const isAdmin = userRoles.includes('ROLE_ADMIN'); // Vérifie si l'utilisateur est un admin

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/produits/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (productId) => {
    // Redirection vers la route d'édition avec l'id du produit
    navigate(`/edit-product/${productId}`);
  };
  
  const handleDelete = async (productId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      try {
        const response = await fetch(`http://localhost:8000/api/produitsdelete/${productId}`, {
          method: 'DELETE',
          headers: {
           'Authorization': `Bearer ${token}`, // Remplacez "yourToken" par le token JWT stocké
           'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Erreur lors de la suppression du produit');
        }
        // Filtrer le produit supprimé de la liste des produits
        setProducts(products.filter(product => product.id !== productId));
      } catch (error) {
        console.error('Erreur lors de la suppression du produit:', error);
      }
    }
  };
 return (
    
    

    <div className="product-list">
      {products.map(product => (
        <div className="product-card" key={product.id}>
            <div>
            {/* Informations de l'utilisateur */}
                <button onClick={handleLogout}>Déconnexion</button>
            </div>

          <img className="product-image" src={product.image} alt={product.titre} />
          <div className="product-info">
            <div className="product-name">{product.titre}</div>
            <div className="product-price">{product.prix}€</div>
            <div className="product-description">{product.description}</div>
            <div className="product-actions">
            {isAdmin ? (
            <>
            <button onClick={() => handleEdit(product.id)}>Modifier</button>
            <button onClick={() => handleDelete(product.id)}>Supprimer</button>
            <button onClick={() => navigate('/add-product')}>Ajouter un produit</button>
            </>
            ) : (
            <button onClick={() => navigate('/profile')}>Profil</button>
            
            )}

    
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  
};

export default ProductList;

// src/components/Cart.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './ProductList.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8000/api/panier', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération du panier');
        }
        const data = await response.json();
        // Ici, nous extrayons les produits de chaque lignecommand et les stockons dans un nouveau tableau
        const produitsDansLePanier = data.lignecommands.map(ligne => ({
          ...ligne.produit,
          quantite: ligne.quantite, // Ajoutez cette ligne si vous avez une quantité spécifique par produit
        }));
        setCartItems(produitsDansLePanier);
      } catch (error) {
        console.error("Erreur lors de la récupération du panier:", error);
      }
      finally {
        setLoading(false); // Fin du chargement, indépendamment du résultat de la requête
      }
    };
  
    fetchCartItems();
  }, []);

  if (loading) {
    return <div className="spinner-container"><div className="spinner"></div></div>;
  }

  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/panier/remove/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de l\'article du panier');
      }
      // Filtrez l'article supprimé du state cartItems
      setCartItems(cartItems.filter(item => item.id !== productId));
      toast.success('Article supprimé du panier');
    } catch (error) {
      toast.error("Erreur lors de la suppression de l'article:");
    }
  };
  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + (item.quantite * item.prix), 0);
  };
  const handlePayment = () => {
    
    navigate('/checkout', { state: { total: calculateTotal().toFixed(2) } });
  };
  
  

  return (
    <div className="bg-gray-900 min-h-screen bg-gray-100 p-4 flex flex-col items-center">
            <h2 className="text-2xl font-bold my-4 text-white">Votre Panier</h2>
            {cartItems.length === 0 ? (
                <p className="text-2xl font-bold my-4 text-white" >Votre panier est vide</p>
            ) : (
                <div className="w-full max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex flex-col md:flex-row items-center md:items-start md:justify-between border-b-2 border-gray-200 p-4">
                            <img src={item.image} alt={item.titre} className="w-24 h-24 md:w-32 md:h-32 object-cover" />
                            <div className="mt-4 md:mt-0 md:ml-4 flex-1">
                                <h3 className="text-lg font-semibold">{item.titre}</h3>
                                <p>Quantité: {item.quantite}</p>
                                <p>Prix: {item.prix}€</p>
                            </div>
                            <button onClick={() => handleRemoveFromCart(item.id)} className="mt-4 md:mt-0 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                Supprimer
                            </button>
                        </div>
                    ))}
                    <div className="text-right p-4">
                        <strong>Total à payer: {calculateTotal().toFixed(2)}€</strong>
                    </div>
                    <div className="text-center p-4">
                        <button onClick={handlePayment} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Payer
                        </button>
                    </div>
                </div>
            )}
        </div>
  );
  
};

export default Cart;

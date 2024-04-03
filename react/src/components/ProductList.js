import React, { useState, useEffect } from 'react';
import './ProductList.css';
import { useParams, useNavigate } from 'react-router-dom';
import UserNav from './UserNav';
import { toast } from 'react-toastify';


  const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const categoriesMapping = [
    { id: 1, name: 'Portables' },
    { id: 2, name: 'Ordinateurs' },
    // Vous pouvez ajouter d'autres catégories ici si nécessaire
  ];
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [quantities, setQuantities] = useState({});
  const [searchTerm, setSearchTerm] = useState('');


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
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8000/api/produits/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);

        // Extraire les catégories uniques
        const uniqueCategories = Array.from(new Set(data.map(product => product.categorie.id)));
        setCategories(uniqueCategories);
      } catch (error) {
        toast.error('Erreur lors de la récupération des produits:');
      }
      finally {
      setLoading(false); // Fin du chargement, indépendamment du résultat de la requête
      }
    };

    fetchProducts();
  }, [token]);

  if (loading) {
    return <div className="spinner-container"><div className="spinner"></div></div>;
  }

  
    
    const renderCategoryButtons = () => (
      <div className="category-buttons flex flex-wrap gap-2 mt-4 text-white rounded py-2 px-4 border border-white rounded-full">
        <button onClick={() => setSelectedCategory(null)}>Toutes</button>
        {categories.map(categoryId => {
          const category = categoriesMapping.find(c => c.id === categoryId);
          return (
            <button key={categoryId} onClick={() => setSelectedCategory(categoryId)}>
              {category ? category.name : 'Catégorie Inconnue'}
            </button>
          );
        })}
      </div>
    );

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
        toast.success('Produit supprimé avec succès !');
      } catch (error) {
        toast.error('Erreur lors de la suppression du produit');
      }
    }
  };
  const handleAddToCart = async (productId, quantity) => {
    try {
      const response = await fetch('http://localhost:8000/api/panier/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          produitId: productId,
          quantite: quantity, // Utilisation de la quantité passée en paramètre
        }),
      });
      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout au panier');
      }
      toast.success('Produit ajouté au panier');
    } catch (error) {
      toast.error('Erreur lors de l\'ajout au panier:');
    }
  };

  const filteredProducts = products
  .filter(product => selectedCategory ? product.categorie.id === selectedCategory : true)
  .filter(product => product.titre.toLowerCase().includes(searchTerm.toLowerCase()));


  // Les fonctions handleEdit, handleDelete, et handleAddToCart restent inchangées

  return (
   <> 
    <UserNav searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleLogout={handleLogout} />
    <div className=" bg-gray-900 flex flex-col items-center p-4">
    {renderCategoryButtons()}
    <div className="product-list w-full flex flex-wrap justify-center gap-4">
        {filteredProducts.map(product => (
            <div className="product-card w-full max-w-sm bg-white shadow-lg rounded-lg overflow-hidden md:max-w-xs lg:max-w-sm xl:max-w-md" key={product.id}>
                <div className="p-3 flex justify-end">
                    {/* Bouton de déconnexion, ajustez selon les besoins */}
                </div>
                <img className="product-image w-full h-56 object-cover" src={product.image} alt={product.titre} />
                <div className="product-info p-4">
                    <div className="product-name font-bold text-lg mb-2">{product.titre}</div>
                    <div className="product-price text-green-500">{product.prix}€</div>
                    <div className="product-description text-gray-700 text-sm mb-2">{product.description}</div>
                    <div className="product-actions flex flex-wrap justify-between items-center">
                        {isAdmin ? (
                            <>
                                <button className="text-xs sm:text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 min-w-[120px] rounded" onClick={() => handleEdit(product.id)}>Modifier</button>

                                <button className="text-xs sm:text-sm bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 min-w-[120px] rounded" onClick={() => handleDelete(product.id)}>Supprimer</button>

                                

                            </>
                        ) : (
                            <>
                                <p className="text-center text-sm -mt-16">Quantité</p>
                                <input
                                    
                                    type="number"
                                    value={quantities[product.id] || 1}
                                    onChange={e => setQuantities({...quantities, [product.id]: parseInt(e.target.value)})}
                                    min="1"
                                    className="w-20 h-8 text-center text-sm -mt-10 "
                                />
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs" onClick={() => handleAddToCart(product.id, quantities[product.id] || 1)}>Ajouter au panier</button>
                            </>
                        )}
                        {/* Continuez avec les autres boutons et inputs */}
                    </div>
                </div>
            </div>
        ))}
    </div>
</div></>

  );
};


export default ProductList;
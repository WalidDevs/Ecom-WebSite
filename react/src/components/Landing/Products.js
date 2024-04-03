import React from 'react';
import { useNavigate } from 'react-router-dom';

// Imaginons que vous ayez un tableau de produits à afficher
// Pour cet exemple, je vais créer un tableau de produits fictifs
const products = [
  {
    id: 1,
    name: 'Produit 1',
    prix: '600£',
    description: 'Description du produit 1',
    imageUrl: 'https://firmwarespro.com/images/stories/virtuemart/product/doogee-x11.jpg'
  },
  {
    id: 2,
    name: 'Produit 2',
    prix: '500£',
    description: 'Description du produit 2',
    imageUrl: 'https://www.cdiscount.com/pdt2/0/9/9/1/700x700/sam0616985706099/rw/samsung-galaxy-s10-8go-ram-128go-rom-single-sim.jpg'
  },
  {
    id: 3,
    name: 'Produit 2',
    prix: '500£',
    description: 'Description du produit 2',
    imageUrl: 'https://s3.amazonaws.com/images.ecwid.com/images/37743952/1886087256.jpg'
  },{
    id: 4,
    name: 'Produit 2',
    prix: '500£',
    description: 'Description du produit 2',
    imageUrl: 'https://media.ldlc.com/ld/products/00/04/65/16/LD0004651600_2.jpg'
  },
  {
    id: 5,
    name: 'Produit 1',
    prix: '600£',
    description: 'Description du produit 1',
    imageUrl: 'https://www.electrodepot.fr/media/catalog/product/cache/1a40d1f945549a9ec18309b0a600e55c/P987147.jpg?frz-v=2518'
  },
  {
    id: 6,
    name: 'Produit 2',
    prix: '500£',
    description: 'Description du produit 2',
    imageUrl: 'https://th.bing.com/th/id/R.90c887fb8c97983710ff80ab5ee04f7c?rik=YFoEHnWh4g5SAg&pid=ImgRaw&r=0'
  },
  {
    id: 7,
    name: 'Produit 2',
    prix: '500£',
    description: 'Description du produit 2',
    imageUrl: 'https://www.lemeilleuravis.com/wp-content/uploads/2017/01/ordinateur-portable-2018.jpg'
  },{
    id: 8,
    name: 'Produit 2',
    prix: '500£',
    description: 'Description du produit 2',
    imageUrl: 'https://th.bing.com/th/id/OIP.Er7VbfgyFPy2NGNObp8hvgHaGX?rs=1&pid=ImgDetMain'
  },
  
  
];

const Products = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto my-12" id="Products">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="max-w-sm rounded overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            <img className="w-full" src={product.imageUrl} alt={product.name} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{product.name}</div>
              <div className="font-bold text-xl mb-2">{product.prix}</div>
              <p className="text-gray-700 text-base">
                {product.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <p className="mb-4">Découvrez plus de produits en vous connectant !</p>
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate('/signin')}
        >
          Se connecter
        </button>
      </div>
    </div>
  );
};

export default Products;

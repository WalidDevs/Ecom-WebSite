import React from 'react';
import { FaShippingFast, FaBoxOpen, FaCreditCard, FaHeadset } from 'react-icons/fa';

const servicesData = [
  {
    id: 1,
    icon: <FaShippingFast className="text-6xl mx-auto mb-4" />,
    title: 'Livraison rapide',
    description: 'Profitez d’une livraison rapide sur tous vos achats. Nous veillons à ce que vos commandes arrivent à temps.'
  },
  {
    id: 2,
    icon: <FaBoxOpen className="text-6xl mx-auto mb-4" />,
    title: 'Large gamme de produits',
    description: 'Découvrez une vaste sélection de produits dans différentes catégories. Il y en a pour tous les goûts !'
  },
  {
    id: 3,
    icon: <FaCreditCard className="text-6xl mx-auto mb-4" />,
    title: 'Paiements sécurisés',
    description: 'Faites vos achats en toute sécurité grâce à nos systèmes de paiement fiables et sécurisés.'
  },
  {
    id: 4,
    icon: <FaHeadset className="text-6xl mx-auto mb-4" />,
    title: 'Support client 24/7',
    description: 'Notre équipe de support client est toujours disponible pour répondre à vos questions et résoudre vos problèmes.'
  }
];

const Services = () => {
  return (
    <div className="py-12 bg-gray-100" id="Services">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl leading-9 font-extrabold text-gray-900">
            Nos Services
          </h2>
          <p className="mt-3 max-w-4xl mx-auto text-xl text-gray-500 sm:mt-4">
            Chez LamiTech, nous nous engageons à offrir une expérience d'achat exceptionnelle.
          </p>
        </div>

        <div className="mt-10">
          <ul className="md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {servicesData.map(service => (
              <li key={service.id} className="mt-10 md:mt-0">
                <div className="flex">
                  <div className="flex-shrink-0">
                    {service.icon}
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg leading-6 font-medium text-gray-900">{service.title}</h4>
                    <p className="mt-2 text-base leading-6 text-gray-500">
                      {service.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Services;

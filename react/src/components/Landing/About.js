import React from 'react';
import exampleImage from './image-about.jpg'; // Remplacez par le chemin de votre image

const About = () => {
    return (
        <div className="w-11/12 xl:w-4/5 m-auto flex flex-col md:flex-row items-center my-10" id="About">
            <div className="md:w-1/2 p-5">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">À propos de LamiTech</h2>
                <p className="text-gray-600 text-base">
                    LamiTech est une entreprise innovante spécialisée dans la technologie et l'électronique. Fondée en 2020, notre mission est de fournir à nos clients des produits de haute qualité qui intègrent les dernières technologies pour améliorer votre quotidien. De l'électronique grand public aux solutions pour entreprises, LamiTech s'engage à offrir excellence et innovation à travers chaque produit.
                </p>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end p-5">
                <img src={exampleImage} alt="LamiTech Company" className="max-w-xs md:max-w-sm rounded-lg shadow-lg" />
            </div>
        </div>
    );
};

export default About;

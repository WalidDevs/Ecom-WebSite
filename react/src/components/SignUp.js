import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";

const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    nom: '',
    prenom: '',
    phone: '',
    adresse: '',
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error('Erreur lors de l\'inscription');
      }
      toast.success("Vous etes inscrit avec succes !");
      navigate('/signin'); // Rediriger vers la page de connexion après l'inscription
    } catch (error) {
      toast.error('Erreur lors de l\'inscription:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 ">
      <Card shadow={false} className="p-5">
        <Typography variant="h4" color="blue-gray" className="text-center">
          Inscription
        </Typography>
        <Typography color="gray" className="mt-1 font-normal text-center">
          Entrez vos informations pour s'inscrire, Merci !
        </Typography>
        <form
          onSubmit={handleSubmit}
          className="mt-8 mb-2 flex flex-col gap-4 items-center justify-center"
        >
          <Input
            type="text"
            name="nom"
            value={user.nom}
            onChange={handleChange}
            placeholder="Nom"
            size="lg"
            className="w-full max-w-xs"
          />
          <Input
            type="text"
            name="prenom"
            value={user.prenom}
            onChange={handleChange}
            placeholder="Prénom"
            size="lg"
            className="w-full max-w-xs"
          />
          <Input
            type="tel"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            placeholder="Téléphone"
            size="lg"
            className="w-full max-w-xs"
          />
          <Input
            type="text"
            name="adresse"
            value={user.adresse}
            onChange={handleChange}
            placeholder="Adresse"
            size="lg"
            className="w-full max-w-xs"
          />
          <Input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
            size="lg"
            className="w-full max-w-xs"
          />
          <Input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Mot de passe"
            size="lg"
            className="w-full max-w-xs"
          />
          <Button type="submit" variant="gradient" className="mt-4" fullWidth>
            S'inscrire
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default SignUp;

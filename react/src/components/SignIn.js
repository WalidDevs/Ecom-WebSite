import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { toast } from 'react-toastify';

const SignIn = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/login_check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: credentials.email, // Ou email si votre API utilise le champ email
            password: credentials.password,
          }),
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la connexion');
      }
      const data = await response.json();
      localStorage.setItem('token', data.token); // Stockez le token JWT
      localStorage.setItem('userId', data.user.id); // Supposons que l'API renvoie l'ID de l'utilisateur sous `data.user.id`
      localStorage.setItem('userRoles', JSON.stringify(data.user.role_user)); // Stockez les rôles de l'utilisateur
      navigate('/Product'); // Rediriger vers la page d'accueil après la connexion
    } catch (error) {
      toast.error('Erreur lors de la connexion:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Connexion
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <form onSubmit={handleSubmit} className="mt-6 mb-8 flex flex-col gap-4 items-center justify-center">
            <Input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              label="Email"
              size="lg"
              required
            />
            <Input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              label="Mot de passe"
              size="lg"
              required
            />
            <CardFooter className="pt-0">
              <Button type="submit" variant="gradient" fullWidth>
                Se connecter
              </Button>
            </CardFooter>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default SignIn;
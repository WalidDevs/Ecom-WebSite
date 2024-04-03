import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ProductList from './components/ProductList';
import EditProduct from './components/EditProduct';
import AddProduct from './components/AddProduct';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import UserProfile from './components/UserProfile';
import EditProfile from './components/EditProfile';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutForm';
import LandingPage from './components/Landing/LandingPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Importez votre composant de paiement ici si nécessaire

// Remplacez 'pk_test_votreCléPublique' par votre vraie clé publique Stripe
const stripePromise = loadStripe('pk_test_51OrN1yGSygIoaZrndBH9vOrNImxWZyzuhwUxbt6Jek8WZDsbUMAB8WUZagpF74DAbo8FOLD4P3Hr0V5adDJnGbRH003SsGzTz8');

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <Router>
        <Routes>
        <Route path="/" element={<LandingPage />} />
          <Route path="/Product" element={<ProductList />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutForm />} />
          {/* Ajoutez d'autres routes ici si nécessaire */}
        </Routes>
      </Router>
      <ToastContainer />
    </Elements>
  );
};

export default App;

import React, { useState } from 'react'; // Ajoutez useState ici
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';



export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const location = useLocation();
    const total = location.state?.total; // Récupérez le montant total passé
    const [email, setEmail] = useState('');
    

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            console.log('Stripe n\'a pas encore été chargé');
            return;
        }

        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.log('[Erreur]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            // Envoyez paymentMethod.id à votre serveur pour finaliser le paiement
            try {
                const response = await fetch('http://localhost:8000/finalize-payment', { // Assurez-vous que cette URL est correcte pour votre serveur
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body : JSON.stringify({ paymentMethodId: paymentMethod.id, total: total, email: email  }),
                });
                const responseData = await response.json();
                if (response.ok) {
                    toast.success('Paiement réussi', responseData);
                    // Gérer le succès du paiement ici (par exemple, afficher un message de succès)
                } else {
                    toast.error('Erreur lors du paiement', responseData.error);
                    // Gérer l'erreur ici (par exemple, afficher un message d'erreur)
                }
            } catch (error) {
                console.error('Erreur lors de l\'envoi à /finalize-payment', error);
            }
        }
    };

    return (
        <div className=" bg-gray-900 flex flex-col items-center justify-center min-h-screen w-full">
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center  px-4">
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre email"
                className="w-full max-w-md px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
            <div className="w-full max-w-md mb-4 px-4 py-2 border border-gray-300 rounded-lg  bg-white">
                <CardElement className=""options={{ hidePostalCode: true }} />
            </div>
            <button
                type="submit"
                disabled={!stripe}
                className="w-full max-w-md bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline disabled:opacity-50"
            >
                Payer {total}€
            </button>
        </form>
        </div> 
    );
}

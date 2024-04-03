<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Stripe\Exception\ApiErrorException;
use Stripe\StripeClient;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class PaymentController extends AbstractController
{
    private $stripeClient;

    public function __construct(StripeClient $stripeClient)
    {
        $this->stripeClient = $stripeClient;
    }

    /**
     * @Route("/finalize-payment", name="finalize_payment", methods={"POST"})
     */
    public function finalizePayment(Request $request, MailerInterface $mailer): Response
    {
        $data = json_decode($request->getContent(), true);
        $paymentMethodId = $data['paymentMethodId'];
        
        try {
            // Créer ou récupérer le client Stripe (dans cet exemple, nous supposons un nouveau client)
            $customer = $this->stripeClient->customers->create([
                'payment_method' => $paymentMethodId,
                'invoice_settings' => ['default_payment_method' => $paymentMethodId],
            ]);

            // Attacher le PaymentMethod au client
            $this->stripeClient->paymentMethods->attach($paymentMethodId, ['customer' => $customer->id]);

            if (empty($paymentMethodId) || empty($data['total']) || empty($data['email'])) {
                return $this->json(['error' => 'Données de paiement manquantes ou incorrectes'], Response::HTTP_BAD_REQUEST);
            }
            

            // Créer une intention de paiement
            $paymentIntent = $this->stripeClient->paymentIntents->create([
                'amount' => $data['total'] * 100, // Montant en centimes
                'currency' => 'eur',
                'customer' => $customer->id,
                'payment_method' => $paymentMethodId,
                'off_session' => true,
                'confirm' => true,
            ]);

            // Vérifier le statut du paiement

            if ($paymentIntent->status === 'succeeded') {
                // Préparer et envoyer l'email
                $email = (new Email())
                    ->from('eljabriadnane@gmail.com')
                    ->to($data['email']) // Utiliser l'email fourni dans la requête
                    ->subject('Confirmation de paiement')
                    ->text('Votre paiement a été traité avec succès.');
    
                $mailer->send($email);}
        

            return $this->json(['success' => 'Paiement réussi', 'paymentIntent' => $paymentIntent->id]);
            
        } catch (ApiErrorException $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    
    /**
     * @Route("/email", name="email", methods={"GET"})
     */

    public function testSendEmail(MailerInterface $mailer): Response
{
    $email = (new Email())
        ->from('your_email@example.com')
        ->to('recipient_email@example.com')
        ->subject('Test Email')
        ->text('This is a test email.');

    $mailer->send($email);

    return new Response('Email sent.');
}

}

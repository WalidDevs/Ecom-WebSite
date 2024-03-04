<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

class ProfileController extends AbstractController
{
    
    /**
     * @Route("/api/profile", name="api_profile", methods={"GET"})
     */
    public function index(Security $security): Response
    {
        $user = $security->getUser();
        if (!$user) {
            return $this->json(['message' => 'Utilisateur non trouvé'], Response::HTTP_NOT_FOUND);
        }

        // Suppose que votre entité Utilisateur a des getters pour ces champs
        $userData = [
            'email' => $user->getEmail(),
            'nom' => $user->getNom(),
            'prenom' => $user->getPrenom(),
            'adresse' => $user->getAdresse(),
            'phone' => $user->getPhone(),
            // Ne renvoyez PAS le mot de passe, même hashé
        ];

        return $this->json($userData);
    }
}

<?php
// src/EventListener/AuthenticationSuccessListener.php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\Security\Core\User\UserInterface;

class AuthenticationSuccessListener
{
    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
    {
        $data = $event->getData();
        $user = $event->getUser();

        if (!$user instanceof UserInterface) {
            return;
        }

        // Ici, vous ajoutez l'ID de l'utilisateur à la réponse
        $data['user'] = [
            'id' => $user->getId(),
            'role_user'=> $user->getRoleUser(),
            // Vous pouvez ajouter d'autres informations de l'utilisateur ici si nécessaire
        ];

        $event->setData($data);
    }
}

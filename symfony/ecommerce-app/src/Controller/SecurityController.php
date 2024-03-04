<?php

namespace App\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Utilisateur;
use App\Entity\Role;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;




class SecurityController
{
    

    /**
     * @Route("/api/register", name="api_register", methods={"POST"})
     */

    public function register(Request $request, UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        
        $user = new Utilisateur();
        $user->setEmail($data['email']);
        $user->setNom($data['nom']);
        $user->setPrenom($data['prenom']);
        $user->setAdresse($data['adresse']); // Assurez-vous que cette donnée est fournie dans la requête
        $user->setPhone($data['phone']);
        $user->setRoleUser('utilisateur'); // Assurez-vous que cette donnée est fournie dans la requête
        // Configurez les autres propriétés selon vos besoins

        $role = $em->getRepository(Role::class)->findOneBy(['typerole' => 'client']); // Assurez-vous que ce rôle existe
        $user->setRole($role);

        $user->setPassword($passwordHasher->hashPassword($user, $data['password']));
        $em->persist($user);
        $em->flush();

        return new JsonResponse(['status' => 'Utilisateur créé'], Response::HTTP_CREATED);
    }
}

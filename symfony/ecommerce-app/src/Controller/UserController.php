<?php

namespace App\Controller;

use App\Entity\Utilisateur;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Security\Core\Security;

class UserController extends AbstractController
{

    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    /**
     * @Route("/api/utilisateurs/edit/{id}", name="edit_user", methods={"PUT"})
     */
    public function editUser(Request $request, EntityManagerInterface $em, UserPasswordHasherInterface $passwordHasher, Utilisateur $user): Response
    {
        $currentUser = $this->security->getUser();
        if ($currentUser->getId() !== $user->getId()) {
            return $this->json(['message' => 'Access Denied.'], Response::HTTP_FORBIDDEN);
        }

        $data = json_decode($request->getContent(), true);

        $user->setEmail($data['email'] ?? $user->getEmail());
        $user->setNom($data['nom'] ?? $user->getNom());
        $user->setPrenom($data['prenom'] ?? $user->getPrenom());
        $user->setPhone($data['phone'] ?? $user->getPhone());
        $user->setAdresse($data['adresse'] ?? $user->getAdresse());
        
        if (!empty($data['password'])) {
            $user->setPassword($passwordHasher->hashPassword($user, $data['password']));
        }

        $em->persist($user);
        $em->flush();

        return $this->json($user, Response::HTTP_OK, [], ['groups' => 'user:read']);
    }

   /**
 * @Route("/api/utilisateurs/delete/{id}", name="delete_user", methods={"DELETE"})
 */
public function deleteUser(EntityManagerInterface $em, Utilisateur $user, Security $security): Response
{
    // Vérifier si l'utilisateur connecté est celui qu'on tente de supprimer
    if ($user !== $security->getUser()) {
        throw new AccessDeniedException('Vous ne pouvez supprimer que votre propre compte.');
    }

    $em->remove($user);
    $em->flush();

    return $this->json(null, Response::HTTP_NO_CONTENT);
}
}

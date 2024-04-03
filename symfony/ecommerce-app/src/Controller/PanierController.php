<?php

namespace App\Controller;
use App\Repository\CommandeRepository;
use App\Entity\Commande;
use App\Entity\LigneCommand;
use App\Entity\Produit;
use App\Entity\Utilisateur;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Serializer\SerializerInterface;

class PanierController extends AbstractController
{
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    /**
     * @Route("/api/panier/add", name="panier_add", methods={"POST"})
     */
    public function add(Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);

        /** @var Utilisateur $user */
        $user = $this->security->getUser();
        $produit = $entityManager->getRepository(Produit::class)->find($data['produitId']);
        $quantite = $data['quantite'];

        if (!$produit) {
            return $this->json(['message' => 'Produit non trouvé'], Response::HTTP_NOT_FOUND);
        }

        // Vérifie si l'utilisateur a une commande en cours
        $commande = $entityManager->getRepository(Commande::class)->findOneBy(['utilisateur' => $user, 'etat' => 'en cours']);

        if (!$commande) {
            $commande = new Commande();
            $commande->setUtilisateur($user);
            $commande->setDatecommande(new \DateTime());
            $commande->setEtat('en cours');
            $entityManager->persist($commande);
        }

        // Ajoute le produit à la commande
        $ligneCommand = new LigneCommand();
        $ligneCommand->setProduit($produit);
        $ligneCommand->setQuantite($quantite);
        $ligneCommand->setCmde($commande);

        $entityManager->persist($ligneCommand);
        $entityManager->flush();

        return $this->json(['message' => 'Produit ajouté au panier'], Response::HTTP_OK);
    }

     /**
     * @Route("/api/panier", name="get_panier", methods={"GET"})
     */
    public function getPanier(CommandeRepository $commandeRepository, SerializerInterface $serializer): Response
{
    $user = $this->getUser();
    if (!$user) {
        return $this->json(['message' => 'Utilisateur non connecté'], Response::HTTP_FORBIDDEN);
    }
    
    $panier = $commandeRepository->findPanierEnCoursPourUtilisateur($user);
    
    if (!$panier) {
        return $this->json(['message' => 'Aucun panier en cours trouvé'], Response::HTTP_NOT_FOUND);
    }
        
        // Sérialiser la commande et les produits associés
        $data = $serializer->serialize($panier, 'json', ['groups' => ['panier:read']]);
        
        return new Response($data, Response::HTTP_OK, ['Content-Type' => 'application/json']);
    }

     /**
     * @Route("/api/panier/remove/{produitId}", name="panier_remove", methods={"DELETE"})
     */
    public function removeFromCart(int $produitId, EntityManagerInterface $em): Response
    {
        $user = $this->security->getUser();
        if (!$user) {
            return $this->json(['message' => 'Utilisateur non connecté'], Response::HTTP_FORBIDDEN);
        }

        // Trouver la commande (panier) en cours pour l'utilisateur
        $commande = $em->getRepository(Commande::class)->findOneBy([
            'utilisateur' => $user,
            'etat' => 'en cours' // Assurez-vous que cet état correspond à celui utilisé dans votre application
        ]);

        if (!$commande) {
            return $this->json(['message' => 'Panier non trouvé'], Response::HTTP_NOT_FOUND);
        }

        // Trouver la ligne de commande associée au produit dans le panier
        $ligneCommand = $em->getRepository(LigneCommand::class)->findOneBy([
            'produit' => $produitId,
            'cmde' => $commande
        ]);

        if (!$ligneCommand) {
            return $this->json(['message' => 'Produit non trouvé dans le panier'], Response::HTTP_NOT_FOUND);
        }

        // Supprimer la ligne de commande (le produit du panier)
        $em->remove($ligneCommand);
        $em->flush();

        return $this->json(['message' => 'Produit supprimé du panier']);
    }
}

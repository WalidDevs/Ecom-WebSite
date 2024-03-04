<?php


namespace App\Controller;

use App\Entity\Produit;
use App\Form\ProduitType;
use App\Repository\ProduitRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use JMS\Serializer\SerializerBuilder;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Entity\Categorie;

/**
 * @Route("/api/produits")
 */
class ProduitController extends AbstractController
{
    /**
     * @Route("/", name="produit_index", methods={"GET"})
     */
    public function index(ProduitRepository $produitRepository): Response
    {
        $produits = $produitRepository->findAll();

        $serializer = SerializerBuilder::create()->build();
        $reponse = $serializer->serialize($produits, 'json');
        $reponse = json_decode($reponse);
        return new JsonResponse($reponse);

        //return $this->json($produit);
    }

    /**
     * @Route("/new", name="produit_new", methods={"POST"})
     */
    public function new(Request $request): Response
    {
        $produit = new Produit();
        $form = $this->createForm(ProduitType::class, $produit);
        $data = json_decode($request->getContent(), true);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($produit);
            $entityManager->flush();

            return $this->json($produit, Response::HTTP_CREATED);
        }

        return $this->json(['error' => 'Invalid data'], Response::HTTP_BAD_REQUEST);
    }

    /**
     * @Route("/{id}/edit", name="produit_edit", methods={"PUT"})
     */
    public function edit(Request $request, Produit $produit): Response
    {
        $form = $this->createForm(ProduitType::class, $produit, ['include_category' => false]);
        $form->submit(json_decode($request->getContent(), true));
    
        if ($form->isSubmitted()) {
            $this->getDoctrine()->getManager()->flush();
            return $this->json(['success' => 'Produit mis à jour avec succès', 'id' => $produit->getId()]);
        }
    
        return $this->json(['error' => 'Invalid data'], Response::HTTP_BAD_REQUEST);
    }
    

    /**
     * @Route("delete/{id}", name="produit_delete", methods={"DELETE"})
     */
    
    public function delete(Request $request, Produit $produit): Response
    {
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($produit);
        $entityManager->flush();
    
        return $this->json(['message' => 'Product deleted'], Response::HTTP_NO_CONTENT);
    }

    /**
     * @Route("/{id}", name="produit_show", methods={"GET"})
     */

    public function show(Produit $produit): Response
    {
        $serializer = SerializerBuilder::create()->build();
        $reponse = $serializer->serialize($produit, 'json');
        $reponse = json_decode($reponse);
        return new JsonResponse($reponse);
        //return $this->json($produit);
    }

    /**
     * @Route("/api/produits/category/{categoryId}", name="produits_by_category", methods={"GET"})
     */
    public function getProductsByCategory(int $categoryId): Response
    {
        $entityManager = $this->getDoctrine()->getManager();
        $category = $entityManager->getRepository(Categorie::class)->find($categoryId);
        
        if (!$category) {
            return $this->json(['message' => 'Catégorie non trouvée'], Response::HTTP_NOT_FOUND);
        }

        $products = $entityManager->getRepository(Produit::class)->findBy(['categorie' => $category]);

        return $this->json($products);
    }


    



}

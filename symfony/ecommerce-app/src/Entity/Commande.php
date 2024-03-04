<?php

namespace App\Entity;

use App\Repository\CommandeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=CommandeRepository::class)
 */
class Commande
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="date")
     */
    private $datecommande;

    /**
     * @ORM\ManyToOne(targetEntity=Utilisateur::class, inversedBy="commandes")
     */
    private $utilisateur;

    /**
     * @ORM\ManyToMany(targetEntity=Produit::class, mappedBy="command")
     */
    private $produits;

    /**
     * @ORM\OneToMany(targetEntity=LigneCommand::class, mappedBy="cmde")
     */
    private $lignecommands;

    /**
     * @ORM\OneToOne(targetEntity=Paiment::class, mappedBy="commannde", cascade={"persist", "remove"})
     */
    private $paiment;

    public function __construct()
    {
        $this->produits = new ArrayCollection();
        $this->lignecommands = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDatecommande(): ?\DateTimeInterface
    {
        return $this->datecommande;
    }

    public function setDatecommande(\DateTimeInterface $datecommande): self
    {
        $this->datecommande = $datecommande;

        return $this;
    }

    public function getUtilisateur(): ?utilisateur
    {
        return $this->utilisateur;
    }

    public function setUtilisateur(?utilisateur $utilisateur): self
    {
        $this->utilisateur = $utilisateur;

        return $this;
    }

    /**
     * @return Collection<int, Produit>
     */
    public function getProduits(): Collection
    {
        return $this->produits;
    }

    public function addProduit(Produit $produit): self
    {
        if (!$this->produits->contains($produit)) {
            $this->produits[] = $produit;
            $produit->addCommand($this);
        }

        return $this;
    }

    public function removeProduit(Produit $produit): self
    {
        if ($this->produits->removeElement($produit)) {
            $produit->removeCommand($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, Lignecommand>
     */
    public function getLignecommands(): Collection
    {
        return $this->lignecommands;
    }

    public function addLignecommand(Lignecommand $lignecommand): self
    {
        if (!$this->lignecommands->contains($lignecommand)) {
            $this->lignecommands[] = $lignecommand;
            $lignecommand->setCmde($this);
        }

        return $this;
    }

    public function removeLignecommand(Lignecommand $lignecommand): self
    {
        if ($this->lignecommands->removeElement($lignecommand)) {
            // set the owning side to null (unless already changed)
            if ($lignecommand->getCmde() === $this) {
                $lignecommand->setCmde(null);
            }
        }

        return $this;
    }

    public function getPaiment(): ?Paiment
    {
        return $this->paiment;
    }

    public function setPaiment(?Paiment $paiment): self
    {
        // unset the owning side of the relation if necessary
        if ($paiment === null && $this->paiment !== null) {
            $this->paiment->setCommannde(null);
        }

        // set the owning side of the relation if necessary
        if ($paiment !== null && $paiment->getCommannde() !== $this) {
            $paiment->setCommannde($this);
        }

        $this->paiment = $paiment;

        return $this;
    }
}

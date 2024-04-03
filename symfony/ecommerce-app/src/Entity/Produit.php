<?php

namespace App\Entity;

use App\Repository\ProduitRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;


/**
 * @ORM\Entity(repositoryClass=ProduitRepository::class)
 */
class Produit
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"panier:read"})
     */

     
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"panier:read"})
     */

    
    private $image;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"panier:read"})
     */

     
    private $titre;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"panier:read"})
     */

     
    private $description;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"panier:read"})
     */

     
    private $prix;

    /**
     * @ORM\ManyToMany(targetEntity=Utilisateur::class, mappedBy="produit")
     */
    private $utilisateurs;

    /**
     * @ORM\ManyToMany(targetEntity=Commande::class, inversedBy="produits")
     * @Groups("panier:read")
     */
    private $command;

    /**
     * @ORM\ManyToOne(targetEntity=Categorie::class, inversedBy="products")
     */
    private $categorie;

    /**
     * @ORM\OneToMany(targetEntity=LigneCommand::class, mappedBy="produit", cascade={"remove"})
     */
    private $cmd;

    public function __construct()
    {
        $this->utilisateurs = new ArrayCollection();
        $this->command = new ArrayCollection();
        $this->cmd = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): self
    {
        $this->image = $image;

        return $this;
    }

    public function getTitre(): ?string
    {
        return $this->titre;
    }

    public function setTitre(string $titre): self
    {
        $this->titre = $titre;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getPrix(): ?string
    {
        return $this->prix;
    }

    public function setPrix(string $prix): self
    {
        $this->prix = $prix;

        return $this;
    }

    /**
     * @return Collection<int, Utilisateur>
     */
    public function getUtilisateurs(): Collection
    {
        return $this->utilisateurs;
    }

    public function addUtilisateur(Utilisateur $utilisateur): self
    {
        if (!$this->utilisateurs->contains($utilisateur)) {
            $this->utilisateurs[] = $utilisateur;
            $utilisateur->addProduit($this);
        }

        return $this;
    }

    public function removeUtilisateur(Utilisateur $utilisateur): self
    {
        if ($this->utilisateurs->removeElement($utilisateur)) {
            $utilisateur->removeProduit($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, commande>
     */
    public function getCommand(): Collection
    {
        return $this->command;
    }

    public function addCommand(commande $command): self
    {
        if (!$this->command->contains($command)) {
            $this->command[] = $command;
        }

        return $this;
    }

    public function removeCommand(commande $command): self
    {
        $this->command->removeElement($command);

        return $this;
    }

    public function getCategorie(): ?Categorie
    {
        return $this->categorie;
    }

    public function setCategorie(?Categorie $categorie): self
    {
        $this->categorie = $categorie;

        return $this;
    }

    /**
     * @return Collection<int, lignecommand>
     */
    public function getCmd(): Collection
    {
        return $this->cmd;
    }

    public function addCmd(lignecommand $cmd): self
    {
        if (!$this->cmd->contains($cmd)) {
            $this->cmd[] = $cmd;
            $cmd->setProduit($this);
        }

        return $this;
    }

    public function removeCmd(lignecommand $cmd): self
    {
        if ($this->cmd->removeElement($cmd)) {
            // set the owning side to null (unless already changed)
            if ($cmd->getProduit() === $this) {
                $cmd->setProduit(null);
            }
        }

        return $this;
    }
}

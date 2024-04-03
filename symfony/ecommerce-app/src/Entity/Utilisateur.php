<?php

namespace App\Entity;

use App\Repository\UtilisateurRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=UtilisateurRepository::class)
 */
class Utilisateur implements UserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $nom;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $prenom;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $adresse;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $phone;

    /**
     * @ORM\ManyToMany(targetEntity=Produit::class, inversedBy="utilisateurs")
     */
    private $produit;

    /**
     * @ORM\OneToMany(targetEntity=Commande::class, mappedBy="utilisateur", cascade={"remove"})
     */
    private $commandes;

    /**
     * @ORM\OneToOne(targetEntity=Role::class, mappedBy="utilisater", cascade={"persist", "remove"})
     */
    private $role;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $role_user = 'utilisateur';

    public function __construct()
    {
        $this->produit = new ArrayCollection();
        $this->commandes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(string $prenom): self
    {
        $this->prenom = $prenom;

        return $this;
    }

    public function getAdresse(): ?string
    {
        return $this->adresse;
    }

    public function setAdresse(string $adresse): self
    {
        $this->adresse = $adresse;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(string $phone): self
    {
        $this->phone = $phone;

        return $this;
    }

    /**
     * @return Collection<int, produit>
     */
    public function getProduit(): Collection
    {
        return $this->produit;
    }

    public function addProduit(produit $produit): self
    {
        if (!$this->produit->contains($produit)) {
            $this->produit[] = $produit;
        }

        return $this;
    }

    public function removeProduit(produit $produit): self
    {
        $this->produit->removeElement($produit);

        return $this;
    }

    /**
     * @return Collection<int, Commande>
     */
    public function getCommandes(): Collection
    {
        return $this->commandes;
    }

    public function addCommande(Commande $commande): self
    {
        if (!$this->commandes->contains($commande)) {
            $this->commandes[] = $commande;
            $commande->setUtilisateur($this);
        }

        return $this;
    }

    public function removeCommande(Commande $commande): self
    {
        if ($this->commandes->removeElement($commande)) {
            // set the owning side to null (unless already changed)
            if ($commande->getUtilisateur() === $this) {
                $commande->setUtilisateur(null);
            }
        }

        return $this;
    }

    public function getRole(): ?Role
    {
        return $this->role;
    }

    public function setRole(?Role $role): self
    {
        // unset the owning side of the relation if necessary
        if ($role === null && $this->role !== null) {
            $this->role->setUtilisater(null);
        }

        // set the owning side of the relation if necessary
        if ($role !== null && $role->getUtilisater() !== $this) {
            $role->setUtilisater($this);
        }

        $this->role = $role;

        return $this;
    }

    public function getRoles()
    {
        // Exemple simple, retourne un tableau de rôles statiques
        // Vous devriez adapter cette méthode pour qu'elle retourne les rôles réels de l'utilisateur
        return ['ROLE_USER'];
    }
    

    
    public function getSalt()
    {
        // Pas nécessaire si vous utilisez bcrypt ou argon2i
        return null;
    }
    
    public function getUsername()
    {
        return $this->email;
    }
    
    public function eraseCredentials()
    {
        // Ici, vous pouvez nettoyer les données sensibles temporaires
    }

     
    public function getRoleUser(): array
    {
        switch ($this->role_user) {
            case 'admin':
                return ['ROLE_ADMIN'];
            case 'utilisateur':
                return ['ROLE_USER'];
            default:
                return ['ROLE_USER'];
        }
    }

    public function setRoleUser(string $role_user): self
    {
        $this->role_user = $role_user;

        return $this;
    }

    public function getUserIdentifier(): string
    {
        return $this->email; // ou retournez l'attribut que vous utilisez comme identifiant unique
    }
}

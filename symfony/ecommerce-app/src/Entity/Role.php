<?php

namespace App\Entity;

use App\Repository\RoleRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=RoleRepository::class)
 */
class Role
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
    private $typerole;

    /**
     * @ORM\OneToOne(targetEntity=Utilisateur::class, inversedBy="role", cascade={"persist", "remove"})
     */
    private $utilisater;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTyperole(): ?string
    {
        return $this->typerole;
    }

    public function setTyperole(string $typerole): self
    {
        $this->typerole = $typerole;

        return $this;
    }

    public function getUtilisater(): ?utilisateur
    {
        return $this->utilisater;
    }

    public function setUtilisater(?utilisateur $utilisater): self
    {
        $this->utilisater = $utilisater;

        return $this;
    }
}

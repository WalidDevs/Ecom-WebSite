<?php

namespace App\Entity;

use App\Repository\PaimentRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=PaimentRepository::class)
 */
class Paiment
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
    private $datepaiment;

    /**
     * @ORM\OneToOne(targetEntity=Commande::class, inversedBy="paiment", cascade={"persist", "remove"})
     */
    private $commannde;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDatepaiment(): ?\DateTimeInterface
    {
        return $this->datepaiment;
    }

    public function setDatepaiment(\DateTimeInterface $datepaiment): self
    {
        $this->datepaiment = $datepaiment;

        return $this;
    }

    public function getCommannde(): ?commande
    {
        return $this->commannde;
    }

    public function setCommannde(?commande $commannde): self
    {
        $this->commannde = $commannde;

        return $this;
    }
}

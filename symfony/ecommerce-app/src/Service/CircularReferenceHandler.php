<?php
namespace App\Service;

class CircularReferenceHandler
{
    public function __invoke($object)
    {
        // Retournez l'identifiant de l'objet ou toute autre propriété unique pour gérer la référence circulaire
        return $object->getId();
    }
}

<?php



namespace App\Form;

use App\Entity\Produit;
use App\Entity\Categorie;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ProduitType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('titre')
            ->add('description')
            ->add('prix')
            ->add('image');
            if ($options['include_category']) {
                $builder->add('categorie', EntityType::class, [
                    'class' => Categorie::class,
                    'choice_label' => 'categorie',
                ]);
            ;
            }
    }        

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Produit::class,
            'csrf_protection' => false, // Disable CSRF if API
            'include_category' => true, // Assurez-vous que cette ligne est présente
            
        ]);

        $resolver->setDefined('include_category');
    }
}

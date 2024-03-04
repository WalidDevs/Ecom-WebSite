<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240226140019 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE ligne_command ADD produit_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE ligne_command ADD CONSTRAINT FK_1153D4EDF347EFB FOREIGN KEY (produit_id) REFERENCES produit (id)');
        $this->addSql('CREATE INDEX IDX_1153D4EDF347EFB ON ligne_command (produit_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE ligne_command DROP FOREIGN KEY FK_1153D4EDF347EFB');
        $this->addSql('DROP INDEX IDX_1153D4EDF347EFB ON ligne_command');
        $this->addSql('ALTER TABLE ligne_command DROP produit_id');
    }
}

<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240226140752 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE paiment ADD commannde_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE paiment ADD CONSTRAINT FK_DC8138F627CC073 FOREIGN KEY (commannde_id) REFERENCES commande (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_DC8138F627CC073 ON paiment (commannde_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE paiment DROP FOREIGN KEY FK_DC8138F627CC073');
        $this->addSql('DROP INDEX UNIQ_DC8138F627CC073 ON paiment');
        $this->addSql('ALTER TABLE paiment DROP commannde_id');
    }
}

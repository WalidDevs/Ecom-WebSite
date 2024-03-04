<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240226140326 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE ligne_command ADD cmde_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE ligne_command ADD CONSTRAINT FK_1153D4ED6A125F1C FOREIGN KEY (cmde_id) REFERENCES commande (id)');
        $this->addSql('CREATE INDEX IDX_1153D4ED6A125F1C ON ligne_command (cmde_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE ligne_command DROP FOREIGN KEY FK_1153D4ED6A125F1C');
        $this->addSql('DROP INDEX IDX_1153D4ED6A125F1C ON ligne_command');
        $this->addSql('ALTER TABLE ligne_command DROP cmde_id');
    }
}

import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createOrphanages1602678998684 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    // Realizar alterações
    // Criar tabela, criar novo campo, deletar algum campo
    await queryRunner.createTable(new Table({
      name: 'orphanages',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'name',
          type: 'varchar'
        },
        {
          name: 'latitude',
          type: 'decimal',
          scale: 10,
          precision: 2
        },
        {
          name: 'longitude',
          type: 'decimal',
          scale: 10,
          precision: 2
        },
        {
          name: 'about',
          type: 'text'
        },
        {
          name: 'open_on_weekends',
          type: 'boolean'
        }
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    // Desfazer o que foi feito no up
    await queryRunner.dropTable('orphanages')
  }
}

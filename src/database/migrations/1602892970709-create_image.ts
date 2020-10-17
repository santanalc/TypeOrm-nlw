import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createImage1602892970709 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "images",
        columns: [
          {
            name: "id",
            type: "integer",
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "path",
            type: "varchar",
          },
          {
            name: "orphanage_id",
            type: "integer",
          },
        ],
        foreignKeys: [
          {
            name: "ImageOrphanage",
            columnNames: ["orphanage_id"],
            referencedTableName: "orphanages",
            referencedColumnNames: ["id"],
            onUpdate: "CASCADE", //Caso eu mude o id na tabela Orphanages, muda aqui tb
            onDelete: "CASACADE", //Caso eu delete a tabela, deleta a imagem
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(new Table());
  }
}

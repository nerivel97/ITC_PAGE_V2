import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("noticias")
export class Noticia {
  @PrimaryGeneratedColumn()
  id_noticia!: number;

  @Column({ length: 100, nullable: false })
  nombre_noticia!: string;

  @Column('text', { nullable: false })
  descripcion!: string;

  @Column({ length: 50, nullable: false })  // Se añadió la coma faltante
  fecha_publicacion!: string;

  @Column({ length: 100, nullable: false })
  autor!: string;

  @Column({ length: 255, nullable: true })
  imagen!: string;
}
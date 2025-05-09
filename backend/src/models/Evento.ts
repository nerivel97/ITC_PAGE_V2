import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("eventos")
export class Evento {
  @PrimaryGeneratedColumn()
  id_evento!: number;

  @Column({ length: 100, nullable: false })
  nombre_evento!: string;

  @Column({ length: 50, nullable: false })
  categoria!: string;

  @Column('text', { nullable: false })
  descripcion!: string;

  @Column({ length: 50, nullable: false })  // Se añadió la coma faltante
  fecha_inicio!: string;

  @Column({ length: 50, nullable: false })  // Se añadió la coma faltante
  fecha_final!: string;  // Nota: En tu SQL es "fecha_final", aquí dice "fecha_final" - asegúrate que coincidan

  @Column({ length: 20, nullable: false })
  estado!: string;

  @Column({ length: 255, nullable: true })
  imagen!: string;
}
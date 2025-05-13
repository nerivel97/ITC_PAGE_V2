import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Career } from './Carrera';
import { Subject } from './Materia';

@Entity({ name: 'reticula' })
export class Reticle {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  description!: string | null;

  @Column({ name: 'urlimagen', type: 'varchar', length: 255, nullable: true })
  imageUrl!: string | null;

  @OneToOne(() => Career, (career) => career.reticle, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'carreraid' })
  career!: Career;

  @OneToMany(() => Subject, (subject) => subject.reticle)
  subjects!: Subject[];

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    // default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    // default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Reticle } from './Reticula';

@Entity({ name: 'carrera' })
export class Career {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'clave', type: 'varchar', length: 20, unique: true })
  code!: string;

  @Column({ name: 'nombre', type: 'varchar', length: 100 })
  name!: string;

  @Column({ name: 'introduccion', type: 'text', nullable: true })
  introduction!: string | null;

  @Column({ type: 'text', nullable: true })
  mision!: string | null;

  @Column({ type: 'text', nullable: true })
  vision!: string | null;

  @Column({ name: 'objetivos', type: 'text', nullable: true })
  objectives!: string | null;

  @Column({ name: 'acreditacion', type: 'text', nullable: true })
  certificate!: string | null;

  @Column({ name: 'perfilingreso', type: 'text', nullable: true })
  entryProfile!: string | null;

  @Column({ name: 'perfilegreso', type: 'text', nullable: true })
  graduateProfile!: string | null;

  @Column({ name: 'urlimagen', type: 'varchar', length: 255, nullable: true })
  imageUrl!: string | null;

  @OneToOne(() => Reticle, (reticle) => reticle.career)
  reticle!: Reticle;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;
}

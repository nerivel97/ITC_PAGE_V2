import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Reticle } from './Reticula';

@Entity({ name: 'materia' })
@Check('"totalcreditos" >= 0')
@Check('"creditos" >= 0')
@Check('"totalcreditos" > "creditos"')
export class Subject {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'clave', type: 'varchar', length: 20, unique: true })
  code!: string;

  @Column({ name: 'nombre', type: 'varchar', length: 100 })
  name!: string;

  @Column({ name: 'totalcreditos', type: 'int' })
  totalCredits!: number;

  @Column({ name: 'creditos', type: 'int' })
  credits!: number;

  @Column({ name: 'urltemario', type: 'varchar', length: 255, nullable: true })
  syllabusUrl!: string | null;

  @Column({ name: 'esespecialidad', type: 'boolean', default: false })
  isSpecialty!: boolean;

  @Column({ name: 'especialidad', type: 'text', nullable: true })
  specialtyName!: string | null;

  @Column({ name: 'estructuragenerica', type: 'boolean', default: false })
  isGenericStructure!: boolean;

  @Column({ name: 'residenciaprofesional', type: 'boolean', default: false })
  isProfessionalResidency!: boolean;

  @Column({ name: 'serviciosocial', type: 'boolean', default: false })
  isSocialService!: boolean;

  @Column({
    name: 'actividadescomplementarias',
    type: 'boolean',
    default: false,
  })
  isComplementaryActivities!: boolean;

  @ManyToOne(() => Reticle, (reticle) => reticle.subjects, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'reticulaid' })
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

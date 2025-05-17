import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Carrera } from './Carrera.entity';

@Entity('campos_laborales')
export class CampoLaboral {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @Column({ 
    name: 'descripcion', 
    type: 'text' 
  })
  descripcion!: string;

  @Column({ 
    name: 'orden', 
    type: 'int', 
    nullable: true,
    default: 0
  })
  orden!: number;

  @ManyToOne(() => Carrera, carrera => carrera.camposLaborales)
  @JoinColumn({ name: 'carrera_id' })
  carrera!: Carrera;
}
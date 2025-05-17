import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Carrera } from './Carrera.entity';

@Entity('mision_vision_objetivos')
export class MisionVisionObjetivo {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @Column({ 
    name: 'tipo',
    type: 'enum',
    enum: ['mision', 'vision', 'objetivo']
  })
  tipo!: string;

  @Column({ 
    name: 'contenido', 
    type: 'text' 
  })
  contenido!: string;

  @Column({ 
    name: 'orden', 
    type: 'int', 
    nullable: true,
    default: 0
  })
  orden!: number;

  @ManyToOne(() => Carrera, carrera => carrera.misionesVisionesObjetivos)
  @JoinColumn({ name: 'carrera_id' })
  carrera!: Carrera;
}
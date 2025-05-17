import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Carrera } from './Carrera.entity';

@Entity('perfil_alumno')
export class PerfilAlumno {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @Column({ 
    name: 'tipo',
    type: 'enum',
    enum: ['ingreso', 'egreso']
  })
  tipo!: string;

  @Column({ 
    name: 'descripcion', 
    type: 'text' 
  })
  descripcion!: string;

  @ManyToOne(() => Carrera, carrera => carrera.perfilesAlumno)
  @JoinColumn({ name: 'carrera_id' })
  carrera!: Carrera;
}
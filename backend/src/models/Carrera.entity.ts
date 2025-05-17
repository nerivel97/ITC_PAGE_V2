import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CampoLaboral } from './CampoLaboral.entity';
import { FuncionProfesional } from './FuncionProfesional.entity';
import { MisionVisionObjetivo } from './MisionVisionObjetivo.entity';
import { PerfilAlumno } from './PerfilAlumno.entity';

@Entity('carreras')
export class Carrera {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @Column({ 
    name: 'url_slug', 
    length: 100, 
    unique: true 
  })
  urlSlug!: string;

  @Column({ 
    name: 'title', 
    length: 100 
  })
  titulo!: string;

  @Column({ 
    name: 'tipo',
    type: 'enum',
    enum: ['licenciatura', 'maestria', 'doctorado']
  })
  tipo!: string;

  @Column({ 
    name: 'imagen_banner', 
    length: 255, 
    nullable: true 
  })
  imagenBanner!: string;

  @Column({ 
    name: 'bg_color', 
    length: 7, 
    nullable: true,
    default: '#cdcdcd'
  })
  bgColor!: string;

  @Column({ 
    name: 'foto_mascota', 
    length: 255, 
    nullable: true 
  })
  fotoMascota!: string;

  @Column({ 
    name: 'description', 
    type: 'text', 
    nullable: true 
  })
  descripcion!: string;

  @Column({ 
    name: 'foto_ingreso', 
    length: 255, 
    nullable: true 
  })
  fotoIngreso!: string;

  @Column({ 
    name: 'foto_egreso', 
    length: 255, 
    nullable: true 
  })
  fotoEgreso!: string;

  @Column({ 
    name: 'created_at', 
    type: 'timestamp', 
    default: () => 'CURRENT_TIMESTAMP' 
  })
  createdAt!: Date;

  @Column({ 
    name: 'updated_at', 
    type: 'timestamp', 
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  updatedAt!: Date;

  // Relaciones
  @OneToMany(() => CampoLaboral, campo => campo.carrera)
  camposLaborales!: CampoLaboral[];

  @OneToMany(() => FuncionProfesional, funcion => funcion.carrera)
  funcionesProfesionales!: FuncionProfesional[];

  @OneToMany(() => MisionVisionObjetivo, mvo => mvo.carrera)
  misionesVisionesObjetivos!: MisionVisionObjetivo[];

  @OneToMany(() => PerfilAlumno, perfil => perfil.carrera)
  perfilesAlumno!: PerfilAlumno[];
}
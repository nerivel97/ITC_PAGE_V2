export interface ICarrera {
  id?: number;
  urlSlug: string;
  titulo: string;
  tipo: 'licenciatura' | 'maestria' | 'doctorado';
  imagenBanner?: string;
  bgColor?: string;
  fotoMascota?: string;
  descripcion?: string;
  fotoIngreso?: string;
  fotoEgreso?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICarreraCreate extends Omit<ICarrera, 'id' | 'createdAt' | 'updatedAt'> {
  camposLaborales?: ICampoLaboral[];
  funcionesProfesionales?: IFuncionProfesional[];
  misionesVisionesObjetivos?: IMisionVisionObjetivo[];
  perfilesAlumno?: IPerfilAlumno[];
}

export interface ICarreraUpdate extends Partial<ICarreraCreate> {
  id?: number;
}

// Interfaces para entidades relacionadas
export interface ICampoLaboral {
  id?: number;
  descripcion: string;
  orden?: number;
}

export interface IFuncionProfesional {
  id?: number;
  descripcion: string;
  orden?: number;
}

export interface IMisionVisionObjetivo {
  id?: number;
  tipo: 'mision' | 'vision' | 'objetivo';
  contenido: string;
  orden?: number;
}

export interface IPerfilAlumno {
  id?: number;
  tipo: 'ingreso' | 'egreso';
  descripcion: string;
}
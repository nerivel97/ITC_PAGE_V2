export type CarreraTipo = 'licenciatura' | 'maestria' | 'doctorado';
export type TipoMisionVision = 'mision' | 'vision' | 'objetivo';
export type TipoPerfilAlumno = 'ingreso' | 'egreso';

export interface ICarrera {
  id: number;
  url_slug: string;
  title: string;
  tipo: CarreraTipo;
  description?: string;
  bg_color?: string;
  imagen_banner?: string;
  foto_mascota?: string;
  foto_ingreso?: string;
  foto_egreso?: string;

  campos_laborales?: Array<{
    descripcion: string;
    orden?: number;
  }>;

  funciones_profesionales?: Array<{
    descripcion: string;
    orden?: number;
  }>;

  mision_vision_objetivos?: Array<{
    tipo: TipoMisionVision;
    contenido: string;
    orden?: number;
  }>;

  perfil_alumno?: Array<{
    tipo: TipoPerfilAlumno;
    descripcion: string;
  }>;

  created_at?: string;
  updated_at?: string;
}

export interface ICarreraFormData {
  id?: number;
  title: string;
  url_slug: string;
  tipo: CarreraTipo;
  description?: string;
  bg_color?: string;
  imagen_banner?: string;
  foto_mascota?: string;
  foto_ingreso?: string;
  foto_egreso?: string;

  misiones?: string[];
  visiones?: string[];
  objetivos?: string[];

  perfil_alumno?: Array<{
  tipo: TipoPerfilAlumno;
  descripcion: string;
  }>;
  
  campos_laborales?: string[];
  funciones_profesionales?: string[];
}
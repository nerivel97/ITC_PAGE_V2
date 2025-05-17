import { ApiResponse, PaginatedResponse } from './api.interface';

export type TTipoOferta = 'licenciatura' | 'maestria' | 'doctorado';

export interface IMisionVisionObjetivo {
  id?: number;
  tipo: 'mision' | 'vision' | 'objetivo';
  contenido: string;
  orden: number;
}

export interface IPerfilAlumno {
  id?: number;
  tipo: 'ingreso' | 'egreso';
  descripcion: string;
}

export interface ICampoLaboral {
  id?: number;
  carrera_id?: number;
  descripcion: string;
  orden?: number;
}

export interface IFuncionProfesional {
  id?: number;
  carrera_id?: number;
  descripcion: string;
  orden?: number;
}

export interface IOferta {
  id: number;
  urlSlug: string;
  titulo: string;
  tipo: TTipoOferta;
  descripcion: string;
  bgColor: string;
  imagenBanner?: string | null;
  fotoMascota?: string | null;
  fotoIngreso?: string | null;
  fotoEgreso?: string | null;
  camposLaborales: ICampoLaboral[];
  funcionesProfesionales: IFuncionProfesional[];
  misionesVisionesObjetivos: IMisionVisionObjetivo[];
  perfilesAlumno: IPerfilAlumno[];
  duracion?: string;
  creditos?: number;
  modalidad?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IOfertaFormData {
  id?: number;
  titulo: string;
  urlSlug: string;
  tipo: TTipoOferta; // Tipo específico aquí
  descripcion: string;
  bgColor: string;
  imagenBanner?: string | null;
  fotoMascota?: string | null;
  fotoIngreso?: string | null;
  fotoEgreso?: string | null;
  misiones: string[];
  visiones: string[];
  objetivos: string[];
  perfilIngreso: string;
  perfilEgreso: string;
  camposLaborales: string[];
  funcionesProfesionales: string[];
  duracion?: string;
  creditos?: number;
  modalidad?: string;
}
export interface IOfertaCreate {
  titulo: string;
  urlSlug: string;
  tipo: TTipoOferta;
  descripcion: string;
  bgColor: string;
  imagenBanner?: string | null;
  fotoMascota?: string | null;
  fotoIngreso?: string | null;
  fotoEgreso?: string | null;
  misionesVisionesObjetivos: Array<{
    tipo: 'mision' | 'vision' | 'objetivo';
    contenido: string;
    orden: number;
  }>;
  perfilesAlumno: Array<{ tipo: 'ingreso' | 'egreso'; descripcion: string }>;
  camposLaborales: Array<{ descripcion: string; orden: number }>;
  funcionesProfesionales: Array<{ descripcion: string; orden: number }>;
  duracion?: string;
  creditos?: number;
  modalidad?: string;
}

export interface IOfertaUpdate extends Partial<Omit<IOfertaCreate, 'id'>> {
  id: number;
}

export interface IOfertaResponse extends ApiResponse<IOferta> {
  data?: IOferta;
}

export interface IOfertasPaginatedResponse extends PaginatedResponse<IOferta> {
  data: IOferta[];
}

export interface IOfertaFilters {
  tipo?: TTipoOferta;
  search?: string;
  page?: number;
  limit?: number;
}

export const TIPOS_PROGRAMA = {
  licenciatura: 'Licenciatura',
  maestria: 'Maestría',
  doctorado: 'Doctorado'
} as const;
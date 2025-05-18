export interface IAdmision {
  id_admision?: number;
  anio: number;
  periodo: string;
  fecha_inicio: string;
  fecha_fin: string;
  fecha_solicitud: string;
  
}

export interface IRequisito {
  id_requisito?: number;
  descripcion: string;
  id_convocatoria: number;
} 

export interface IProceso {
  id_admision?: number;
  id_convocatoria: number;
  descripcion: string;
}  
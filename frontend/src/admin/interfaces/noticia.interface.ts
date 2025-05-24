export interface INoticia {
    id_noticia?: number;
    nombre_noticia: string;
    descripcion: string;
    fecha_publicacion: string;
    autor: string;
    imagen?: string;
  }

  export interface INoticiaCreate {
  nombre_noticia: string;
  descripcion: string;
  fecha_publicacion: string;
  autor: string;
  imagen?: string;
}

export interface INoticiaUpdate {
  nombre_noticia?: string;
  descripcion?: string;
  fecha_publicacion?: string;
  autor?: string;
  imagen?: string;
}
  
  export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}
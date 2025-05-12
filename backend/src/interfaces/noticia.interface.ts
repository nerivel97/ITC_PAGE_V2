export interface INoticia {
    id_noticia?: number;
    nombre_noticia: string;
    descripcion: string;
    fecha_publicacion: string;
    autor: string;
    imagen?: string;
  }
  
  export interface INoticiaCreate extends Omit<INoticia, 'id_noticia'> {
    // Puedes agregar validaciones específicas del frontend si es necesario
  }
  
  export interface INoticiaUpdate extends Partial<INoticiaCreate> {
    // Campos opcionales para actualización
  }
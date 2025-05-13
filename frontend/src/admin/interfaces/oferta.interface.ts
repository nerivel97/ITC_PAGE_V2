// src/interfaces/oferta.interface.ts
export interface IOferta {
    id?: number;
    titulo: string;
    descripcion: string;
    color: string;
  }
  
  export interface IOfertaCreate {
    titulo: string;
    descripcion: string;
    color: string;
  }
  
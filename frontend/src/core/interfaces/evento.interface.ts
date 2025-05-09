// frontend/src/core/interfaces/evento.interface.ts
export interface IEvento {
  id_evento: number;
  nombre_evento: string;
  descripcion: string;
  fecha_inicio: string;
  fecha_final: string;
  categoria: string;
  estado: string;
  imagen: string;
}

// Otras interfaces relacionadas (si las tienes)
export interface IEventoCreate extends Omit<IEvento, 'id_evento'> {}
export interface IEventoUpdate extends Partial<IEventoCreate> {}
export interface IEvento {
  id_evento?: number;
  nombre_evento: string;
  categoria: string;
  descripcion: string;
  fecha_inicio: string;  // Frontend siempre usa strings
  fecha_final: string;   // Frontend siempre usa strings
  estado: string;
  imagen?: string;
}

export interface IEventoCreate {
  nombre_evento: string;
  categoria: string;
  descripcion: string;
  fecha_inicio: string;  // Frontend siempre usa strings
  fecha_final: string;   // Frontend siempre usa strings
  estado: string;
  imagen?: string;
}

export interface IEventoUpdate {
  nombre_evento: string;
  categoria: string;
  descripcion: string;
  fecha_inicio: string;  // Frontend siempre usa strings
  fecha_final: string;   // Frontend siempre usa strings
  estado: string;
  imagen?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}
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

export interface IEventoCreate extends Omit<IEvento, 'id_evento'> {
  // Puedes agregar validaciones específicas del frontend si es necesario
}

export interface IEventoUpdate extends Partial<IEventoCreate> {
  // Campos opcionales para actualización
}
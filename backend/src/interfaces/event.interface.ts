export interface IEvento {
  id_evento?: number;
  nombre_evento: string;
  categoria: string;
  descripcion: string;
  fecha_inicio: Date | string;  // Backend puede manejar Date o string
  fecha_final: Date | string;   // Backend puede manejar Date o string
  estado: string; // Valores específicos
  imagen?: string;     // Más explícito con el null
}

export interface IEventoCreate extends Omit<IEvento, 'id_evento'> {
  fecha_inicio: string;  // Forzamos string para la creación
  fecha_final: string;   // Forzamos string para la creación
}

export interface IEventoUpdate extends Partial<Omit<IEventoCreate, 'fecha_inicio' | 'fecha_final'>> {
  fecha_inicio?: string; // Opcionales pero deben ser string si se envían
  fecha_final?: string;  // Opcionales pero deben ser string si se envían
}
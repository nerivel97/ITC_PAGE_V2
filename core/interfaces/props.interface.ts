// src/core/interfaces/props.interface.ts
import { IEvento} from './evento.interface';

export interface EventoCardProps {
  evento: IEvento;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export interface EventoListProps {
  eventos: IEvento[];
  loading?: boolean;
  onRefresh?: () => void;
}

export interface EventoFormProps {
  initialData?: Partial<IEvento>;
  onSubmit: (data: IEvento) => void;
  loading?: boolean;
  validationSchema?: any; // Puedes tipar esto con yup o zod
}
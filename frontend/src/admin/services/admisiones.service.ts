import { IAdmision /*, IProceso, IRequisito */ } from '../interfaces/admision.interface';

// Datos de ejemplo para mostrar en el panel
const mockAdmisiones: IAdmision[] = [
  {
    id_admision: 1,
    anio: 2020,
    periodo: 'Otoño',
    fecha_inicio: '2024-05-15T10:30:00Z',
    fecha_fin: '2024-05-15T10:30:00Z',
    fecha_solicitud: undefined
  },
  {
    id_admision: 2,
    anio: 2021,
    periodo: 'Otoño',
    fecha_inicio: '2024-05-15T10:30:00Z',
    fecha_fin: '2024-05-15T10:30:00Z',
    fecha_solicitud: undefined
  },
  {
    id_admision: 3,
    anio: 2021,
    periodo: 'Primavera',
    fecha_inicio: '2024-05-15T10:30:00Z',
    fecha_fin: '2024-05-15T10:30:00Z',
    fecha_solicitud: undefined
  },
  {
    id_admision: 4,
    anio: 2022,
    periodo: 'Otoño',
    fecha_inicio: '2024-05-15T10:30:00Z',
    fecha_fin: '2024-05-15T10:30:00Z',
    fecha_solicitud: undefined
  },
  {
    id_admision: 5,
    anio: 2022,
    periodo: 'Primavera',
    fecha_inicio: '2024-05-15T10:30:00Z',
    fecha_fin: '2024-05-15T10:30:00Z',
    fecha_solicitud: undefined
  },
];

/* const mockRequisitos: IRequisito[] = [
  {
    id_requisito: 1,
    descripcion: 'Descripcion 1',
    id_convocatoria: 1,
  },
  {
    id_requisito: 2,
    descripcion: 'Descripcion 2',
    id_convocatoria: 1,
  },
  {
    id_requisito: 3,
    descripcion: 'Descripcion 3',
    id_convocatoria: 1,
  },
  {
    id_requisito: 4,
    descripcion: 'Descripcion 4',
    id_convocatoria: 1,
  },
  {
    id_requisito: 5,
    descripcion: 'Descripcion 5',
    id_convocatoria: 1,
  },
];

const mockProcesos: IProceso[] = [
  {
    id_admision: 1,
    id_convocatoria: 1,
    descripcion: 'Descripcion 1',
  },
  {
    id_admision: 2,
    id_convocatoria: 1,
    descripcion: 'Descripcion 2',
  },
  {
    id_admision: 3,
    id_convocatoria: 1,
    descripcion: 'Descripcion 3',
  },
  {
    id_admision: 4,
    id_convocatoria: 1,
    descripcion: 'Descripcion 4',
  },
  {
    id_admision: 5,
    id_convocatoria: 1,
    descripcion: 'Descripcion 5',
  },
]; */

/**
 * Obtiene todas las admisiones
 */
export const fetchAdmisiones = async (): Promise<IAdmision[]> => {
  // Simulación de una llamada a API con datos de ejemplo
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAdmisiones);
    }, 1000);
  });
};

/* export const fetchRequisitos = async (): Promise<IRequisito[]> => {
  // Simulación de una llamada a API con datos de ejemplo
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRequisitos);
    }, 1000);
  });
}; */

/* export const fetchProcesos = async (): Promise<IProceso[]> => {
  // Simulación de una llamada a API con datos de ejemplo
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProcesos);
    }, 1000);
  });
}; */

/**
 * Crea una nueva admisión
 */
export const createAdmision = async (admision: Omit<IAdmision, 'id_admision'>): Promise<IAdmision> => {
  // Simulación de una llamada a API para crear un nuevo registro
  return new Promise((resolve) => {
    setTimeout(() => {
      const newAdmision: IAdmision = {
        ...admision,
        id_admision: Math.floor(Math.random() * 1000) + 10 // ID aleatorio
      };
      resolve(newAdmision);
    }, 1000);
  });
};

/**
 * Actualiza una admisión existente
 */
export const updateAdmision = async (id: number, admision: Omit<IAdmision, 'id_admision'>): Promise<IAdmision> => {
  // Simulación de una llamada a API para actualizar un registro existente
  return new Promise((resolve) => {
    setTimeout(() => {
      const updatedAdmision: IAdmision = {
        ...admision,
        id_admision: id
      };
      resolve(updatedAdmision);
    }, 1000);
  });
};

/**
 * Elimina una admisión por su ID
 */
/* export const deleteAdmision = async (id: number): Promise<void> => {
  // Simulación de una llamada a API para eliminar un registro
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}; */
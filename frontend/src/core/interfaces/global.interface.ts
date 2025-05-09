// Para opciones de dropdowns/selects
export interface ISelectOption {
    value: string | number;
    label: string;
    disabled?: boolean;
  }
  
  // Para datos paginados en tablas
  export interface IPagination {
    page: number;
    pageSize: number;
    totalItems: number;
  }
  
  // Para formularios genéricos
  export interface IFormField<T = any> {
    value: T;
    error?: string;
    touched?: boolean;
  }
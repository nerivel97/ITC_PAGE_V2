export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data: T;
    errors?: Record<string, string[]>;
  }
  
  export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }
  
  export interface ApiErrorResponse {
    status: number;
    message: string;
    errors?: Record<string, string[]>;
  }
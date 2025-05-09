export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
    timestamp: Date;
  }
  
  export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }
import { env } from '../lib/env';

export const isProduction = (): boolean => env.NODE_ENV === 'production';

export const isDevelopment = (): boolean => env.NODE_ENV === 'development';

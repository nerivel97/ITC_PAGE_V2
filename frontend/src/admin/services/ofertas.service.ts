import axios from 'axios';
import {
  IOferta,
  IOfertaResponse,
  IOfertasPaginatedResponse,
  IOfertaCreate,
  IOfertaUpdate
} from '../interfaces/oferta.interface';

const API_BASE = 'http://localhost:4000/api/carreras';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export const fetchOfertas = async (): Promise<IOferta[]> => {
  try {
    const { data } = await api.get<IOfertasPaginatedResponse>('/');
    return data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error al cargar ofertas');
  }
};

export const fetchOfertaById = async (id: number): Promise<IOferta> => {
  try {
    const { data } = await api.get<IOfertaResponse>(`/${id}`);
    if (!data.data) throw new Error('Oferta no encontrada');
    return data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error al cargar oferta');
  }
};

export const createOferta = async (oferta: IOfertaCreate): Promise<IOferta> => {
  try {
    const { data } = await api.post<IOfertaResponse>('/', oferta);
    if (!data.data) throw new Error('Error al crear oferta');
    return data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error al crear oferta');
  }
};

export const updateOferta = async (id: number, oferta: IOfertaUpdate): Promise<IOferta> => {
  try {
    const { data } = await api.put<IOfertaResponse>(`/${id}`, oferta);
    if (!data.data) throw new Error('Error al actualizar oferta');
    return data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error al actualizar oferta');
  }
};

export const deleteOferta = async (id: number): Promise<void> => {
  try {
    await api.delete(`/${id}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error al eliminar oferta');
  }
};
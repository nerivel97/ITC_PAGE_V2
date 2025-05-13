// src/services/ofertas.service.ts
import axios from 'axios';
import { IOferta, IOfertaCreate } from '../interfaces/oferta.interface';

const endpoint = '/ofertas';

export const fetchOfertas = async (): Promise<IOferta[]> => {
  const response = await axios.get(endpoint);
  return response.data;
};

export const createOferta = async (data: IOfertaCreate): Promise<IOferta> => {
  const response = await axios.post(endpoint, data);
  return response.data;
};

export const updateOferta = async (id: number, data: IOfertaCreate): Promise<IOferta> => {
  const response = await axios.put(`${endpoint}/${id}`, data);
  return response.data;
};

export const deleteOferta = async (id: number): Promise<void> => {
  await axios.delete(`${endpoint}/${id}`);
};

import React, { useState } from 'react';
import { message } from 'antd';
import OfertForm from './CarreraForm';
import { ICarrera, ICarreraFormData } from '../../interfaces/oferta.interface';
import { createCarrera, updateCarrera } from '../../services/ofertas.service';
import { transformFormToCreate } from './oferta.utils';

interface Props {
  ofertaParaEditar?: ICarrera;
}

const OfertaPage: React.FC<Props> = ({ ofertaParaEditar }) => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (formData: ICarreraFormData) => {
    setLoading(true);
    try {
      const payload = transformFormToCreate(formData);

      if (formData.id) {
        const updateData = {
          ...payload,
          id: formData.id
        };
        await updateCarrera(formData.id, updateData);
        message.success('Oferta actualizada correctamente');
      } else {
        await createCarrera(payload);
        message.success('Oferta creada correctamente');
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error('Error desconocido');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <OfertForm
      onSubmit={onSubmit}
      initialValues={ofertaParaEditar ? transformOfertaToForm(ofertaParaEditar) : undefined}
      loading={loading}
    />
  );
};

export default OfertaPage;

// Función local para transformar ICarrera a ICarreraFormData
function transformOfertaToForm(carrera: ICarrera): ICarreraFormData {
  return {
    id: carrera.id,
    title: carrera.title,
    url_slug: carrera.url_slug,
    tipo: carrera.tipo,
    description: carrera.description,
    bg_color: carrera.bg_color,
    imagen_banner: carrera.imagen_banner ?? undefined,
    foto_mascota: carrera.foto_mascota ?? undefined,
    foto_ingreso: carrera.foto_ingreso ?? undefined,
    foto_egreso: carrera.foto_egreso ?? undefined,
    misiones: carrera.mision_vision_objetivos
      ?.filter(m => m.tipo === 'mision')
      .map(m => m.contenido) || [],
    visiones: carrera.mision_vision_objetivos
      ?.filter(m => m.tipo === 'vision')
      .map(m => m.contenido) || [],
    objetivos: carrera.mision_vision_objetivos
      ?.filter(m => m.tipo === 'objetivo')
      .map(m => m.contenido) || [],
    perfil_ingreso: carrera.perfil_alumno?.find(p => p.tipo === 'ingreso')?.descripcion,
    perfil_egreso: carrera.perfil_alumno?.find(p => p.tipo === 'egreso')?.descripcion,
    campos_laborales: carrera.campos_laborales?.map(c => c.descripcion) || [],
    funciones_profesionales: carrera.funciones_profesionales?.map(f => f.descripcion) || [],
  };
}
import React, { useState } from 'react';
import { message } from 'antd';
import OfertForm from './OfertForm';
import { IOferta, IOfertaFormData } from '../../interfaces/oferta.interface';
import { createOferta, updateOferta } from '../../services/ofertas.service';
import { transformFormToCreate } from './oferta.utils';

interface Props {
  ofertaParaEditar?: IOferta;
}

const OfertaPage: React.FC<Props> = ({ ofertaParaEditar }) => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (formData: IOfertaFormData) => {
    setLoading(true);
    try {
      const payload = transformFormToCreate(formData);

      if (formData.id) {
        const updateData = {
          ...payload,
          id: formData.id
        };
        await updateOferta(formData.id, updateData);
        message.success('Oferta actualizada correctamente');
      } else {
        await createOferta(payload);
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

// Función local para transformar IOferta a IOfertaFormData
function transformOfertaToForm(oferta: IOferta): IOfertaFormData {
  return {
    id: oferta.id,
    titulo: oferta.titulo,
    urlSlug: oferta.urlSlug,
    tipo: oferta.tipo,
    descripcion: oferta.descripcion,
    bgColor: oferta.bgColor,
    imagenBanner: oferta.imagenBanner ?? undefined,
    fotoMascota: oferta.fotoMascota ?? undefined,
    fotoIngreso: oferta.fotoIngreso ?? undefined,
    fotoEgreso: oferta.fotoEgreso ?? undefined,
    misiones: oferta.misionesVisionesObjetivos
      .filter(m => m.tipo === 'mision')
      .map(m => m.contenido),
    visiones: oferta.misionesVisionesObjetivos
      .filter(m => m.tipo === 'vision')
      .map(m => m.contenido),
    objetivos: oferta.misionesVisionesObjetivos
      .filter(m => m.tipo === 'objetivo')
      .map(m => m.contenido),
    perfilIngreso: oferta.perfilesAlumno.find(p => p.tipo === 'ingreso')?.descripcion || '',
    perfilEgreso: oferta.perfilesAlumno.find(p => p.tipo === 'egreso')?.descripcion || '',
    camposLaborales: oferta.camposLaborales.map(c => c.descripcion),
    funcionesProfesionales: oferta.funcionesProfesionales.map(f => f.descripcion),
    duracion: oferta.duracion,
    creditos: oferta.creditos,
    modalidad: oferta.modalidad
  };
}
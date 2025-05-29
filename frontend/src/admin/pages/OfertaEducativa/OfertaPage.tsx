import React, { useState } from 'react';
import { message } from 'antd';
import CarreraForm from './CarreraForm';
import { ICarrera, ICarreraFormData } from '../../interfaces/oferta.interface';
import { createCarrera, updateCarrera } from '../../services/ofertas.service';
import { carreraToFormData, formDataToCarrera } from './oferta.utils';

interface Props {
  ofertaParaEditar?: ICarrera;
}

const OfertaPage: React.FC<Props> = ({ ofertaParaEditar }) => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (formData: ICarreraFormData) => {
    setLoading(true);
    try {
      const payload = formDataToCarrera(formData); // Aquí transformamos a ICarrera

      if (formData.id) {
        await updateCarrera(formData.id, payload);
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
    <CarreraForm
      onSubmit={onSubmit}
      initialValues={ofertaParaEditar ? carreraToFormData(ofertaParaEditar) : undefined}
      loading={loading}
    />
  );
};

export default OfertaPage;

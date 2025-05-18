import React, { useState } from 'react';
import { Form, Input, Select, DatePicker, message } from 'antd';
import dayjs from 'dayjs';
import { IAdmision } from '../../interfaces/admision.interface';
import { createAdmision, updateAdmision } from '../../services/admisiones.service';

// Propiedades del componente
interface AdmisionFormProps {
  admision: IAdmision | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const AdmisionForm: React.FC<AdmisionFormProps> = ({ admision, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  if (loading){
    console.log("hola");
    
  }

  /* Lista de carreras para el selector
  const carreras = [
    'Ingeniería en Sistemas',
    'Ingeniería Civil',
    'Ingeniería Industrial',
    'Ingeniería Mecánica',
    'Administración de Empresas',
    'Contabilidad',
    'Arquitectura',
    'Diseño Gráfico'
  ];*/

  // Función para manejar el envío del formulario
  const handleSubmit = async (values: any) => {
    setLoading(true);
    
    try {
      // Formatear la fecha
      const formattedValues = {
        ...values,
        fecha_solicitud: values.fecha_solicitud ? values.fecha_solicitud.toISOString() : new Date().toISOString(),
      };

      if (admision?.id_admision) {
        // Actualizar admisión existente
        await updateAdmision(admision.id_admision, formattedValues);
        message.success('Admisión actualizada correctamente');
      } else {
        // Crear nueva admisión
        await createAdmision(formattedValues);
        message.success('Admisión creada correctamente');
      }
      
      onSuccess();
    } catch (error) {
      console.error('Error al guardar:', error);
      message.error('Error al guardar los datos');
    } finally {
      setLoading(false);
    }
  };

  // Inicializar el formulario con los valores existentes si es una edición
  React.useEffect(() => {
    if (admision) {
      form.setFieldsValue({
        ...admision,
        fecha_solicitud: admision.fecha_solicitud ? dayjs(admision.fecha_solicitud) : null,
      });
    } else {
      form.resetFields();
      // Establecer valores por defecto para un nuevo registro
      form.setFieldsValue({
        documentos_completos: false,
        estado: 'pendiente',
        fecha_solicitud: dayjs(),
      });
    }
  }, [admision, form]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        documentos_completos: false,
        estado: 'pendiente'
      }}
    >

      <Form.Item
        name="anio"
        label="Año"
        rules={[{ required: true, message: 'Por favor ingrese el año' }]}
      >
        <Input placeholder="Nombre completo" />
      </Form.Item>

      <Form.Item
        name="periodo"
        label="Periodo"
        rules={[{ required: true, message: 'Por favor seleccione un periodo' }]}
      >
        <Select placeholder="Seleccionar estado">
          <Select.Option value="primavera">Primavera</Select.Option>
          <Select.Option value="otonio">Otoño</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="fecha_inicio"
        label="Fecha de Inicio"
        rules={[{ required: true, message: 'Por favor seleccione la fecha' }]}
      >
        <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
      </Form.Item>

      <Form.Item
        name="fecha_fin"
        label="Fecha de Finalización"
        rules={[{ required: true, message: 'Por favor seleccione la fecha' }]}
      >
        <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
      </Form.Item>
    </Form>
  );
};

export default AdmisionForm; 
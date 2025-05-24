import React, { useEffect } from 'react';
import { 
  Form, 
  Input, 
  DatePicker, 
  Select, 
  Modal, 
  message,
} from 'antd';
import { 
  createEvento, 
  updateEvento,
} from '../../services/eventos.service';
import { IEvento, IEventoCreate } from '../../interfaces/evento.interface';
import dayjs, { Dayjs } from 'dayjs';
import styles from './EventoForm.module.css';

const { TextArea } = Input;
const { Option } = Select;

interface EventoFormProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  evento?: IEvento | null;
}

interface FormValues {
  nombre_evento: string;
  categoria: string;
  descripcion: string;
  fecha_inicio: Dayjs;
  fecha_final: Dayjs;
  estado: string;
  imagen?: string;
}

const EventoForm: React.FC<EventoFormProps> = ({ 
  visible, 
  onCancel, 
  onSuccess, 
  evento 
}) => {
  const [form] = Form.useForm<FormValues>();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (visible && evento) {
      form.setFieldsValue({
        ...evento,
        fecha_inicio: dayjs(evento.fecha_inicio),
        fecha_final: dayjs(evento.fecha_final),
      });
    } else if (visible) {
      form.resetFields();
    }
  }, [visible, evento, form]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      
      const eventoData: IEventoCreate = {
        nombre_evento: values.nombre_evento,
        categoria: values.categoria,
        descripcion: values.descripcion,
        fecha_inicio: values.fecha_inicio.format('YYYY-MM-DD'),
        fecha_final: values.fecha_final.format('YYYY-MM-DD'),
        estado: values.estado,
        imagen: values.imagen
      };

      if (evento?.id_evento) {
        await updateEvento(evento.id_evento, eventoData);
        message.success('Evento actualizado correctamente');
      } else {
        await createEvento(eventoData);
        message.success('Evento creado correctamente');
      }
      
      onSuccess();
    } catch (error: unknown) {
      if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error('Ocurrió un error desconocido');
      }
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={evento ? 'Editar Evento' : 'Crear Nuevo Evento'}
      open={visible}
      onOk={handleSubmit}
      onCancel={onCancel}
      confirmLoading={loading}
      width={700}
      okText={evento ? 'Actualizar' : 'Crear'}
      cancelText="Cancelar"
      destroyOnClose
    >
      <Form<FormValues>
        form={form}
        layout="vertical"
        initialValues={{
          estado: 'Activo',
          imagen: ''
        }}
      >
        <Form.Item
          name="nombre_evento"
          label="Nombre del Evento"
          rules={[
            { required: true, message: 'Por favor ingrese el nombre del evento' },
            { max: 100, message: 'Máximo 100 caracteres' }
          ]}
        >
          <Input placeholder="Ej: Conferencia de Tecnología" />
        </Form.Item>

        <Form.Item
          name="categoria"
          label="Categoría"
          rules={[{ required: true, message: 'Por favor seleccione una categoría' }]}
        >
          <Select placeholder="Seleccione una categoría">
            <Option value="Cultural">Cultural</Option>
            <Option value="Deportivo">Deportivo</Option>
            <Option value="Social">Social</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="descripcion"
          label="Descripción"
          rules={[
            { required: true, message: 'Por favor ingrese una descripción' },
            { min: 20, message: 'Mínimo 20 caracteres' }
          ]}
        >
          <TextArea rows={4} placeholder="Descripción detallada del evento" />
        </Form.Item>

        <div className={styles.dateRow}>
          <Form.Item
            name="fecha_inicio"
            label="Fecha de Inicio"
            rules={[{ required: true, message: 'Por favor seleccione la fecha de inicio' }]}
            className={styles.dateField}
          >
            <DatePicker 
              format="YYYY-MM-DD" 
              style={{ width: '100%' }}
              disabledDate={(current) => current && current < dayjs().startOf('day')}
            />
          </Form.Item>

          <Form.Item
            name="fecha_final"
            label="Fecha de Finalización"
            dependencies={['fecha_inicio']}
            rules={[
              { required: true, message: 'Por favor seleccione la fecha de finalización' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || !getFieldValue('fecha_inicio') || 
                      value.isAfter(getFieldValue('fecha_inicio')) || 
                      value.isSame(getFieldValue('fecha_inicio'))) {
                    return Promise.resolve();
                  }
                  return Promise.reject('La fecha final debe ser posterior a la de inicio');
                },
              }),
            ]}
            className={styles.dateField}
          >
            <DatePicker 
              format="YYYY-MM-DD" 
              style={{ width: '100%' }}
              disabledDate={(current) => current && current < dayjs().startOf('day')}
            />
          </Form.Item>
        </div>

        <Form.Item
          name="estado"
          label="Estado"
          rules={[{ required: true, message: 'Por favor seleccione el estado' }]}
        >
          <Select>
            <Option value="Activo">Activo</Option>
            <Option value="Inactivo">Inactivo</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="imagen"
          label="URL de la Imagen"
          rules={[{ type: 'url', message: 'Ingrese una URL válida' }]}
        >
          <Input placeholder="https://ejemplo.com/imagen.jpg" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EventoForm;
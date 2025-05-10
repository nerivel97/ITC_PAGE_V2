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
import dayjs from 'dayjs';
import styles from './NoticiasForm.module.css';

const { TextArea } = Input;
const { Option } = Select;

interface EventoFormProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  evento?: IEvento | null;
}

const NoticiasForm: React.FC<EventoFormProps> = ({ 
  visible, 
  onCancel, 
  onSuccess, 
  evento 
}) => {
  const [form] = Form.useForm();
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
      
      // Asegurar formato YYYY-MM-DD para las fechas
      const eventoData: IEventoCreate = {
        nombre_evento: values.nombre_evento,
        categoria: values.categoria,
        descripcion: values.descripcion,
        fecha_inicio: dayjs(values.fecha_inicio).format('YYYY-MM-DD'), // Formato explícito
        fecha_final: dayjs(values.fecha_final).format('YYYY-MM-DD'),   // Formato explícito
        estado: values.estado,
        imagen: values.imagen || null
      };
  
      console.log("Datos a enviar:", eventoData);
  
      if (evento) {
        await updateEvento(evento.id_evento!, eventoData);
        message.success('Evento actualizado correctamente');
      } else {
        await createEvento(eventoData);
        message.success('Evento creado correctamente');
      }
      
      onSuccess();
    } catch (error) {
      console.error('Error completo:', error);
      message.error(error instanceof Error ? error.message : 'Error al guardar el evento');
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
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          estado: '',
          imagen: ''
        }}
      >
        <Form.Item
          name="nombre_evento"
          label="Nombre del Evento"
          rules={[{ 
            required: true, 
            message: 'Por favor ingrese el nombre del evento' 
          }]}
        >
          <Input placeholder="Ej: Conferencia de Tecnología" />
        </Form.Item>

        <Form.Item
          name="categoria"
          label="Categoría"
          rules={[{ 
            required: true, 
            message: 'Por favor seleccione una categoría' 
          }]}
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
          rules={[{ 
            required: true, 
            message: 'Por favor ingrese una descripción' 
          }]}
        >
          <TextArea rows={4} placeholder="Descripción detallada del evento" />
        </Form.Item>

        <div className={styles.dateRow}>
          <Form.Item
            name="fecha_inicio"
            label="Fecha de Inicio"
            rules={[{ 
              required: true, 
              message: 'Por favor seleccione la fecha de inicio' 
            }]}
            className={styles.dateField}
          >
            <DatePicker 
              format="YYYY-MM-DD" 
              style={{ width: '100%' }} 
            />
          </Form.Item>

          <Form.Item
            name="fecha_final"
            label="Fecha de Finalización"
            rules={[{ 
              required: true, 
              message: 'Por favor seleccione la fecha de finalización' 
            }]}
            className={styles.dateField}
          >
            <DatePicker 
              format="YYYY-MM-DD" 
              style={{ width: '100%' }} 
            />
          </Form.Item>
        </div>

        <Form.Item
          name="estado"
          label="Estado"
          rules={[{ 
            required: true,
            message: 'Por favor seleccione una opcion' 
          }]}
        >
          <Select placeholder="Selecciona una opcion">
            <Option value="Activo">Activo</Option>
            <Option value="Inactivo">Inactivo</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="imagen"
          label="URL de la Imagen"
        >
          <Input placeholder="https://ejemplo.com/imagen.jpg" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NoticiasForm;
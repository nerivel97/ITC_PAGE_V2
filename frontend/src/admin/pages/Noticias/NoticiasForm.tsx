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
  createNoticia, 
  updateNoticia,
} from '../../services/noticias.service';
import { INoticia, INoticiaCreate } from '../../interfaces/noticia.interface';
import dayjs from 'dayjs';
import styles from './NoticiasForm.module.css';

const { TextArea } = Input;
const { Option } = Select;

interface NoticiaFormProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  noticia?: INoticia | null;
}

const NoticiasForm: React.FC<NoticiaFormProps> = ({ 
  visible, 
  onCancel, 
  onSuccess, 
  noticia 
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (visible && noticia) {
      form.setFieldsValue({
        ...noticia,
        fecha_publicacion: dayjs(noticia.fecha_publicacion),
      });
    } else if (visible) {
      form.resetFields();
    }
  }, [visible, noticia, form]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      
      // Asegurar formato YYYY-MM-DD para las fechas
      const noticiaData: INoticiaCreate = {
        nombre_noticia: values.nombre_noticia,
        descripcion: values.descripcion,
        fecha_publicacion: dayjs(values.fecha_publicacion).format('YYYY-MM-DD'), // Formato explícito
        autor: values.autor,
        imagen: values.imagen || null
      };
  
      console.log("Datos a enviar:", noticiaData);
  
      if (noticia) {
        await updateNoticia(noticia.id_noticia!, noticiaData);
        message.success('noticia actualizado correctamente');
      } else {
        await createNoticia(noticiaData);
        message.success('noticia creado correctamente');
      }
      
      onSuccess();
    } catch (error) {
      console.error('Error completo:', error);
      message.error(error instanceof Error ? error.message : 'Error al guardar el noticia');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={noticia ? 'Editar noticia' : 'Crear Nuevo noticia'}
      open={visible}
      onOk={handleSubmit}
      onCancel={onCancel}
      confirmLoading={loading}
      width={700}
      okText={noticia ? 'Actualizar' : 'Crear'}
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
          name="nombre_noticia"
          label="Nombre del noticia"
          rules={[{ 
            required: true, 
            message: 'Por favor ingrese el nombre del noticia' 
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
          <TextArea rows={4} placeholder="Descripción detallada del noticia" />
        </Form.Item>

        <div className={styles.dateRow}>
          <Form.Item
            name="fecha_publicacion"
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
import React, { useEffect } from 'react';
import { 
  Form, 
  Input, 
  DatePicker, 
  Modal, 
  message,
} from 'antd';
import { 
  createNoticia, 
  updateNoticia,
} from '../../services/noticias.service';
import { INoticia, INoticiaCreate } from '../../interfaces/noticia.interface';
import dayjs from 'dayjs';

const { TextArea } = Input;

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
      
      const noticiaData: INoticiaCreate = {
        nombre_noticia: values.nombre_noticia,
        descripcion: values.descripcion,
        fecha_publicacion: dayjs(values.fecha_publicacion).format('YYYY-MM-DD'),
        autor: values.autor,
        imagen: values.imagen || null
      };
  
      console.log("Datos a enviar:", noticiaData);
  
      if (noticia) {
        await updateNoticia(noticia.id_noticia!, noticiaData);
        message.success('Noticia actualizada correctamente');
      } else {
        await createNoticia(noticiaData);
        message.success('Noticia creada correctamente');
      }
      
      onSuccess();
    } catch (error) {
      console.error('Error completo:', error);
      message.error(error instanceof Error ? error.message : 'Error al guardar la noticia');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={noticia ? 'Editar noticia' : 'Crear nueva noticia'}
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
          imagen: ''
        }}
      >
        <Form.Item
          name="nombre_noticia"
          label="Título de la noticia"
          rules={[{ 
            required: true, 
            message: 'Por favor ingrese el título de la noticia' 
          }]}
        >
          <Input placeholder="Ej: Nuevo avance tecnológico" />
        </Form.Item>

        <Form.Item
          name="descripcion"
          label="Descripción"
          rules={[{ 
            required: true, 
            message: 'Por favor ingrese una descripción' 
          }]}
        >
          <TextArea rows={4} placeholder="Contenido de la noticia" />
        </Form.Item>

        <Form.Item
          name="fecha_publicacion"
          label="Fecha de publicación"
          rules={[{ 
            required: true, 
            message: 'Por favor seleccione la fecha de publicación' 
          }]}
        >
          <DatePicker 
            format="YYYY-MM-DD" 
            style={{ width: '100%' }} 
          />
        </Form.Item>

        <Form.Item
          name="autor"
          label="Autor"
          rules={[{ 
            required: true, 
            message: 'Por favor ingrese el autor' 
          }]}
        >
          <Input placeholder="Nombre del autor" />
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
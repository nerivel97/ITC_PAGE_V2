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
import { INoticia, INoticiaCreate, INoticiaUpdate } from '../../interfaces/noticia.interface';
import dayjs, { Dayjs } from 'dayjs';

const { TextArea } = Input;

interface NoticiaFormProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  noticia?: INoticia | null;
}

interface FormValues {
  nombre_noticia: string;
  descripcion: string;
  fecha_publicacion: Dayjs;
  autor: string;
  imagen?: string;
}

const NoticiasForm: React.FC<NoticiaFormProps> = ({ 
  visible, 
  onCancel, 
  onSuccess, 
  noticia 
}) => {
  const [form] = Form.useForm<FormValues>();
  const [loading, setLoading] = React.useState(false);

  // Limpia el formulario cuando se cierra el modal
  useEffect(() => {
    if (visible && noticia) {
      form.setFieldsValue({
        nombre_noticia: noticia.nombre_noticia,
        descripcion: noticia.descripcion,
        fecha_publicacion: dayjs(noticia.fecha_publicacion),
        autor: noticia.autor,
        imagen: noticia.imagen || ''
      });
    } else if (visible) {
      form.resetFields();
    }
  }, [visible, noticia, form]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      
      const noticiaData: INoticiaCreate | INoticiaUpdate = {
        nombre_noticia: values.nombre_noticia,
        descripcion: values.descripcion,
        fecha_publicacion: values.fecha_publicacion.format('YYYY-MM-DD'),
        autor: values.autor,
        imagen: values.imagen
      };

      if (noticia?.id_noticia) {
        await updateNoticia(noticia.id_noticia, noticiaData);
        message.success('Noticia actualizada correctamente');
      } else {
        await createNoticia(noticiaData as INoticiaCreate);
        message.success('Noticia creada correctamente');
      }
      
      onSuccess();
    } catch (error: unknown) {
      let errorMessage = 'Error al guardar la noticia';
      
      if (error instanceof Error) {
        errorMessage = error.message;
        // Si es un error de Axios
        if ('response' in error) {
          const axiosError = error as { response?: { data?: { message?: string } } };
          errorMessage = axiosError.response?.data?.message || errorMessage;
        }
      }

      console.error('Error al guardar la noticia:', error);
      message.error(errorMessage);
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
      <Form<FormValues>
        form={form}
        layout="vertical"
        initialValues={{
          imagen: ''
        }}
        preserve={false}
      >
        <Form.Item
          name="nombre_noticia"
          label="Título de la noticia"
          rules={[
            { 
              required: true, 
              message: 'Por favor ingrese el título de la noticia' 
            },
            {
              max: 100,
              message: 'El título no debe exceder los 100 caracteres'
            }
          ]}
        >
          <Input placeholder="Ej: Nuevo avance tecnológico" />
        </Form.Item>

        <Form.Item
          name="descripcion"
          label="Descripción"
          rules={[
            { 
              required: true, 
              message: 'Por favor ingrese una descripción' 
            },
            {
              min: 5,
              message: 'La descripción debe tener al menos 5 caracteres'
            }
          ]}
        >
          <TextArea rows={4} placeholder="Contenido de la noticia" showCount maxLength={500} />
        </Form.Item>

        <Form.Item
          name="fecha_publicacion"
          label="Fecha de publicación"
          rules={[
            { 
              required: true, 
              message: 'Por favor seleccione la fecha de publicación' 
            },
          ]}
        >
          <DatePicker 
            format="YYYY-MM-DD" 
            style={{ width: '100%' }}
            disabledDate={(current) => current && current > dayjs().endOf('day')}
          />
        </Form.Item>

        <Form.Item
          name="autor"
          label="Autor"
          rules={[
            { 
              required: true, 
              message: 'Por favor ingrese el autor' 
            },
          ]}
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
import React from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  Typography,
  message
} from 'antd';
import { SketchPicker } from 'react-color';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;

interface OfertFormProps {
  onFinish: (values: any) => void;
  initialValues?: any;
}

const OfertForm: React.FC<OfertFormProps> = ({ onFinish, initialValues }) => {
  const [form] = Form.useForm();
  const [color, setColor] = React.useState(initialValues?.color || '#000000');

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={(values) => {
        onFinish({
          ...values,
          color,
          bannerCarrera: values.bannerCarrera?.[0]?.originFileObj || null,
          mascotaCarrera: values.mascotaCarrera?.[0]?.originFileObj || null
        });
      }}
      initialValues={initialValues}
    >
      <Title level={4}>Agregar/Editar Oferta Académica</Title>

      <Form.Item
        label="Nombre de la carrera"
        name="nombre"
        rules={[{ required: true, message: 'Campo requerido' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Tipo de programa"
        name="tipo"
        rules={[{ required: true, message: 'Campo requerido' }]}
      >
        <Select placeholder="Selecciona el tipo">
          <Option value="Licenciatura">Licenciatura</Option>
          <Option value="Ingeniería">Ingeniería</Option>
          <Option value="Maestría">Maestría</Option>
          <Option value="Doctorado">Doctorado</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Color representativo">
        <SketchPicker
          color={color}
          onChangeComplete={(color) => setColor(color.hex)}
        />
      </Form.Item>

      <Form.Item
        label="Información general"
        name="informacionGeneral"
        rules={[{ required: true, message: 'Campo requerido' }]}
      >
        <TextArea rows={3} />
      </Form.Item>

      <Form.Item
        label="Objetivos"
        name="objetivos"
        rules={[{ required: true, message: 'Campo requerido' }]}
      >
        <TextArea rows={3} />
      </Form.Item>

      <Form.Item
        label="Misión"
        name="mision"
        rules={[{ required: true, message: 'Campo requerido' }]}
      >
        <TextArea rows={2} />
      </Form.Item>

      <Form.Item
        label="Visión"
        name="vision"
        rules={[{ required: true, message: 'Campo requerido' }]}
      >
        <TextArea rows={2} />
      </Form.Item>

      <Form.Item label="Acreditación" name="acreditacion">
        <Input />
      </Form.Item>

      <Form.Item
        label="Perfil de ingreso"
        name="perfilIngreso"
        rules={[{ required: true, message: 'Campo requerido' }]}
      >
        <TextArea rows={3} />
      </Form.Item>

      <Form.Item
        label="Perfil de egreso"
        name="perfilEgreso"
        rules={[{ required: true, message: 'Campo requerido' }]}
      >
        <TextArea rows={3} />
      </Form.Item>

      <Form.Item label="Campo profesional" name="campoProfesional">
        <TextArea rows={3} />
      </Form.Item>

      <Form.Item label="Retícula (PDF o imagen)" name="reticula" valuePropName="fileList" getValueFromEvent={normFile}>
        <Upload beforeUpload={() => false}>
          <Button icon={<UploadOutlined />}>Subir archivo</Button>
        </Upload>
      </Form.Item>

      {/* NUEVO: Banner de la carrera */}
      <Form.Item
        label="Imagen del banner de la carrera"
        name="bannerCarrera"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          accept="image/*"
          beforeUpload={() => false}
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>Subir imagen</Button>
        </Upload>
      </Form.Item>

      {/* NUEVO: Mascota de la carrera */}
      <Form.Item
        label="Imagen de la mascota de la carrera"
        name="mascotaCarrera"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          accept="image/*"
          beforeUpload={() => false}
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>Subir imagen</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Guardar oferta
        </Button>
      </Form.Item>
    </Form>
  );
};

export default OfertForm;

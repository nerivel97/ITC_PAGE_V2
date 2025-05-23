import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  Typography,
  Space,
  Divider,
  Row,
  Col,
  Card,
} from 'antd';
import { SketchPicker } from 'react-color';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { ICarreraFormData } from '../../interfaces/oferta.interface';

const { Option } = Select;
const { Title, Text } = Typography;
const { TextArea } = Input;

interface CarreraFormProps {
  onSubmit?: (data: ICarreraFormData) => Promise<void> | void;
  initialValues?: ICarreraFormData;
  loading?: boolean;
}

const DynamicListInput: React.FC<{ label: string; name: string; placeholder: string }> = ({
  label,
  name,
  placeholder,
}) => {
  const form = Form.useFormInstance();
  const values = Form.useWatch(name, form) || [];

  return (
    <Form.Item label={label}>
      <Form.List name={name}>
        {(_, { add, remove }) => (
          <>
            <Space.Compact style={{ width: '100%' }}>
              <Input
                placeholder={placeholder}
                onPressEnter={e => {
                  const input = e.target as HTMLInputElement;
                  const val = input.value.trim();
                  if (val) {
                    add(val);
                    input.value = '';
                  }
                  e.preventDefault();
                }}
              />
              <Button
                icon={<PlusOutlined />}
                onClick={() => {
                  const input = document.querySelector(`input[placeholder="${placeholder}"]`) as HTMLInputElement;
                  if (input?.value.trim()) {
                    add(input.value.trim());
                    input.value = '';
                  }
                }}
              />
            </Space.Compact>

            <div style={{ marginTop: 8 }}>
              {values.map((item: string, index: number) => (
                <Card key={index} size="small" style={{ marginBottom: 8 }}>
                  <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                    <Text>{item}</Text>
                    <Button type="text" danger icon={<DeleteOutlined />} onClick={() => remove(index)} />
                  </Space>
                </Card>
              ))}
            </div>
          </>
        )}
      </Form.List>
    </Form.Item>
  );
};

const CarreraForm: React.FC<CarreraFormProps> = ({
  onSubmit = () => {},
  initialValues,
  loading = false,
}) => {
  const [form] = Form.useForm();
  const [color, setColor] = useState('#3366ff');

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
      setColor(initialValues.bg_color || '#3366ff');
    }
  }, [initialValues, form]);

  const generateSlug = (title: string) =>
    title
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSlug = generateSlug(e.target.value);
    form.setFieldsValue({ url_slug: newSlug });
  };

  const onFinish = async (values: ICarreraFormData) => {
    try {
      await onSubmit(values);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        misiones: [],
        visiones: [],
        objetivos: [],
        campos_laborales: [],
        funciones_profesionales: [],
        bg_color: '#3366ff',
        ...initialValues,
      }}
    >
      <Title level={3}>{initialValues?.id ? 'Editar Carrera' : 'Nueva Carrera'}</Title>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Nombre de la carrera"
            name="title"
            rules={[{ required: true, message: 'El nombre es requerido' }]}
          >
            <Input onChange={handleTitleChange} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Tipo" name="tipo" rules={[{ required: true, message: 'El tipo es requerido' }]}>
            <Select>
              <Option value="licenciatura">Licenciatura</Option>
              <Option value="maestria">Maestría</Option>
              <Option value="doctorado">Doctorado</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="URL Slug"
        name="url_slug"
        rules={[{ required: true, message: 'El slug es requerido' }]}
      >
        <Input placeholder="Se genera automáticamente" readOnly />
      </Form.Item>

      <Form.Item label="Color representativo" name="bg_color">
        <SketchPicker
          color={color}
          onChangeComplete={col => {
            setColor(col.hex);
            form.setFieldsValue({ bg_color: col.hex });
          }}
        />
      </Form.Item>

      <Form.Item
        label="Descripción"
        name="description"
        rules={[{ required: true, message: 'La descripción es requerida' }]}
      >
        <TextArea rows={4} />
      </Form.Item>

      <Divider orientation="left">Imágenes (URLs)</Divider>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Banner" name="imagen_banner">
            <Input placeholder="https://ejemplo.com/banner.jpg" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Foto mascota" name="foto_mascota">
            <Input placeholder="https://ejemplo.com/mascota.jpg" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Foto perfil ingreso" name="foto_ingreso">
            <Input placeholder="https://ejemplo.com/ingreso.jpg" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Foto perfil egreso" name="foto_egreso">
            <Input placeholder="https://ejemplo.com/egreso.jpg" />
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation="left">Misiones, Visiones y Objetivos</Divider>

      <DynamicListInput label="Misiones" name="misiones" placeholder="Agregar misión" />
      <DynamicListInput label="Visiones" name="visiones" placeholder="Agregar visión" />
      <DynamicListInput label="Objetivos" name="objetivos" placeholder="Agregar objetivo" />

      <Divider orientation="left">Perfil de alumno</Divider>

      <Form.Item label="Perfil de ingreso" name="perfil_ingreso">
        <TextArea rows={2} />
      </Form.Item>

      <Form.Item label="Perfil de egreso" name="perfil_egreso">
        <TextArea rows={2} />
      </Form.Item>

      <Divider orientation="left">Campos laborales</Divider>

      <DynamicListInput label="Campos laborales" name="campos_laborales" placeholder="Agregar campo laboral" />

      <Divider orientation="left">Funciones profesionales</Divider>

      <DynamicListInput
        label="Funciones profesionales"
        name="funciones_profesionales"
        placeholder="Agregar función profesional"
      />

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Guardar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CarreraForm;
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
  const [form] = Form.useForm<ICarreraFormData>();
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
            <Input onChange={handleTitleChange} placeholder="Ejemplo: Ingeniería en Sistemas" />
          </Form.Item>

          <Form.Item
            label="URL Slug"
            name="url_slug"
            rules={[{ required: true, message: 'El slug es requerido' }]}
          >
            <Input placeholder="ingenieria-en-sistemas" />
          </Form.Item>

          <Form.Item label="Tipo de carrera" name="tipo" rules={[{ required: true }]}>
            <Select placeholder="Selecciona tipo">
              <Option value="licenciatura">Licenciatura</Option>
              <Option value="maestria">Maestría</Option>
              <Option value="doctorado">Doctorado</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Descripción" name="description">
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item label="Color de fondo" name="bg_color">
            <SketchPicker
              color={color}
              onChangeComplete={color => {
                setColor(color.hex);
                form.setFieldsValue({ bg_color: color.hex });
              }}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Divider>Misiones</Divider>
          <DynamicListInput label="" name="misiones" placeholder="Agregar misión y presiona Enter" />

          <Divider>Visiones</Divider>
          <DynamicListInput label="" name="visiones" placeholder="Agregar visión y presiona Enter" />

          <Divider>Objetivos</Divider>
          <DynamicListInput label="" name="objetivos" placeholder="Agregar objetivo y presiona Enter" />

          <Divider>Perfil de Ingreso</Divider>
          <Form.Item label="" name="perfil_ingreso">
            <TextArea rows={3} placeholder="Descripción perfil de ingreso" />
          </Form.Item>

          <Divider>Perfil de Egreso</Divider>
          <Form.Item label="" name="perfil_egreso">
            <TextArea rows={3} placeholder="Descripción perfil de egreso" />
          </Form.Item>

          <Divider>Campos Laborales</Divider>
          <DynamicListInput label="" name="campos_laborales" placeholder="Agregar campo laboral y presiona Enter" />

          <Divider>Funciones Profesionales</Divider>
          <DynamicListInput
            label=""
            name="funciones_profesionales"
            placeholder="Agregar función profesional y presiona Enter"
          />
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Guardar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CarreraForm;

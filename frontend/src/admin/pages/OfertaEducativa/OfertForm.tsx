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
  message,
  InputNumber,
} from 'antd';
import { SketchPicker } from 'react-color';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { IOfertaFormData } from '../../interfaces/oferta.interface';


const { Option } = Select;
const { Title, Text } = Typography;
const { TextArea } = Input;

interface IOfertaCreate
  extends Omit<
    IOfertaFormData,
    | 'misiones'
    | 'visiones'
    | 'objetivos'
    | 'perfilIngreso'
    | 'perfilEgreso'
    | 'camposLaborales'
    | 'funcionesProfesionales'
  > {
  misionesVisionesObjetivos: Array<{
    tipo: 'mision' | 'vision' | 'objetivo';
    contenido: string;
    orden: number;
  }>;
  perfilesAlumno: Array<{ tipo: 'ingreso' | 'egreso'; descripcion: string }>;
  camposLaborales: Array<{ descripcion: string; orden: number }>;
  funcionesProfesionales: Array<{ descripcion: string; orden: number }>;
}

interface OfertaFormProps {
  onSubmit?: (data: IOfertaFormData) => Promise<void> | void;
  initialValues?: IOfertaFormData;
  loading?: boolean;
}

export const transformarFormDataAOferta = (data: IOfertaFormData): IOfertaCreate => ({
  ...data,
  camposLaborales: (data.camposLaborales || []).map((descripcion, i) => ({
    descripcion,
    orden: i + 1,
  })),
  funcionesProfesionales: (data.funcionesProfesionales || []).map((descripcion, i) => ({
    descripcion,
    orden: i + 1,
  })),
  misionesVisionesObjetivos: [
    ...(data.misiones?.map((contenido, i) => ({
      tipo: 'mision' as const,
      contenido,
      orden: i + 1,
    })) || []),
    ...(data.visiones?.map((contenido, i) => ({
      tipo: 'vision' as const,
      contenido,
      orden: i + 1,
    })) || []),
    ...(data.objetivos?.map((contenido, i) => ({
      tipo: 'objetivo' as const,
      contenido,
      orden: i + 1,
    })) || []),
  ],
  perfilesAlumno: [
    { tipo: 'ingreso' as const, descripcion: data.perfilIngreso || '' },
    { tipo: 'egreso' as const, descripcion: data.perfilEgreso || '' },
  ].filter(p => p.descripcion),
});

const OfertaForm: React.FC<OfertaFormProps> = ({
  onSubmit = () => {},
  initialValues,
  loading = false,
}) => {
  const [form] = Form.useForm();
  const [color, setColor] = useState('#3366ff');

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
      setColor(initialValues.bgColor || '#3366ff');
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
    form.setFieldsValue({ urlSlug: newSlug });
  };

  const DynamicListInput: React.FC<{ label: string; name: string; placeholder: string }> = ({
    label,
    name,
    placeholder,
  }) => {
    const values = Form.useWatch(name, form) || [];

    return (
      <Form.Item label={label}>
        <Form.List name={name}>
          {(_fields, { add, remove }) => (
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

  const onFinish = async (values: IOfertaFormData) => {
    try {
      await onSubmit?.(values); // ✅ Envía IOfertaFormData sin transformar
    } catch (error) {
      message.error('Error al enviar el formulario');
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
        camposLaborales: [],
        funcionesProfesionales: [],
        modalidad: 'presencial',
        ...initialValues,
      }}
    >
      <Title level={3}>{initialValues?.id ? 'Editar Carrera' : 'Nueva Carrera'}</Title>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Nombre de la carrera"
            name="titulo"
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
        name="urlSlug"
        rules={[{ required: true, message: 'El slug es requerido' }]}
      >
        <Input placeholder="Se genera automáticamente" readOnly />
      </Form.Item>

      <Form.Item label="Color representativo">
        <SketchPicker
          color={color}
          onChangeComplete={col => {
            setColor(col.hex);
            form.setFieldsValue({ bgColor: col.hex });
          }}
        />
      </Form.Item>

      <Form.Item
        label="Descripción"
        name="descripcion"
        rules={[{ required: true, message: 'La descripción es requerida' }]}
      >
        <TextArea rows={4} />
      </Form.Item>

      <Divider orientation="left">Información académica</Divider>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Duración" name="duracion">
            <Input placeholder="Ej: 4 años" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Créditos" name="creditos">
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Modalidad" name="modalidad">
            <Select>
              <Option value="presencial">Presencial</Option>
              <Option value="semipresencial">Semipresencial</Option>
              <Option value="en-linea">En línea</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation="left">Imágenes (URLs)</Divider>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Banner" name="imagenBanner">
            <Input placeholder="https://ejemplo.com/banner.jpg" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Foto mascota" name="fotoMascota">
            <Input placeholder="https://ejemplo.com/mascota.jpg" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Foto perfil ingreso" name="fotoIngreso">
            <Input placeholder="https://ejemplo.com/ingreso.jpg" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Foto perfil egreso" name="fotoEgreso">
            <Input placeholder="https://ejemplo.com/egreso.jpg" />
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation="left">Misiones, Visiones y Objetivos</Divider>

      <DynamicListInput label="Misiones" name="misiones" placeholder="Agregar misión" />
      <DynamicListInput label="Visiones" name="visiones" placeholder="Agregar visión" />
      <DynamicListInput label="Objetivos" name="objetivos" placeholder="Agregar objetivo" />

      <Divider orientation="left">Perfil de alumno</Divider>

      <Form.Item label="Perfil de ingreso" name="perfilIngreso">
        <TextArea rows={2} />
      </Form.Item>

      <Form.Item label="Perfil de egreso" name="perfilEgreso">
        <TextArea rows={2} />
      </Form.Item>

      <Divider orientation="left">Campos laborales</Divider>

      <DynamicListInput label="Campos laborales" name="camposLaborales" placeholder="Agregar campo laboral" />

      <Divider orientation="left">Funciones profesionales</Divider>

      <DynamicListInput
        label="Funciones profesionales"
        name="funcionesProfesionales"
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

export default OfertaForm;

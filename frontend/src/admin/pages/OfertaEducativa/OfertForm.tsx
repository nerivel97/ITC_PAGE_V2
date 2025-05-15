import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  Typography,
  Space,
  List
} from 'antd';
import { SketchPicker } from 'react-color';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Title } = Typography;

interface OfertFormProps {
  onFinish: (values: any) => void;
  initialValues?: any;
}

const DynamicListInput = ({ label, name }: { label: string; name: string }) => {
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addItem = () => {
    if (inputValue.trim()) {
      setItems([...items, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  return (
    <>
      <Form.Item label={label}>
        <Space.Compact style={{ width: '100%' }}>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Agregar ${label.toLowerCase()}`}
          />
          <Button icon={<PlusOutlined />} onClick={addItem} />
        </Space.Compact>
        <List
          bordered
          dataSource={items}
          style={{ marginTop: '10px' }}
          renderItem={(item, index) => (
            <List.Item
              actions={[
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={() => removeItem(index)}
                />,
              ]}
            >
              {item}
            </List.Item>
          )}
        />
      </Form.Item>
      <Form.Item name={name} hidden initialValue={items}>
        <Input type="hidden" />
      </Form.Item>
    </>
  );
};

const OfertForm: React.FC<OfertFormProps> = ({ onFinish, initialValues }) => {
  const [form] = Form.useForm();
  const [color, setColor] = useState(initialValues?.color || '#000000');

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={() => {
        const values = form.getFieldsValue();
        onFinish({ ...values, color });
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
        <Input.TextArea rows={3} />
      </Form.Item>

      <DynamicListInput label="Objetivos" name="objetivos" />
      <DynamicListInput label="Misión" name="mision" />
      <DynamicListInput label="Visión" name="vision" />
      <Form.Item label="Acreditación" name="acreditacion">
        <Input />
      </Form.Item>

      <Form.Item
        label="Perfil de ingreso"
        name="perfilIngreso"
        rules={[{ required: true, message: 'Campo requerido' }]}
      >
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item
        label="Perfil de egreso"
        name="perfilEgreso"
        rules={[{ required: true, message: 'Campo requerido' }]}
      >
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item label="URL de la retícula (PDF o imagen)" name="reticula">
        <Input placeholder="https://..." />
      </Form.Item>

      <Form.Item label="URL del banner de la carrera" name="bannerCarrera">
        <Input placeholder="https://..." />
      </Form.Item>

      <Form.Item label="URL de la mascota de la carrera" name="mascotaCarrera">
        <Input placeholder="https://..." />
      </Form.Item>

      <DynamicListInput label="Campo laboral" name="campoLaboral" />
      <DynamicListInput label="Funciones profesionales" name="funcionesProfesionales" />

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Guardar oferta
        </Button>
      </Form.Item>
    </Form>
  );
};

export default OfertForm;

import React, { useState, useEffect } from 'react';
import { Table, Card, Button, Modal, Tag, Typography, Space, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { 
  fetchCarreras, 
  deleteCarrera,
  fetchCarreraById,
  createCarrera,
  updateCarrera
} from '../../services/ofertas.service';
import CarreraForm from '../OfertaEducativa/CarreraForm';
import { ICarrera, ICarreraFormData } from '../../interfaces/oferta.interface';
import { transformFormToCreate, transformCarreraToForm } from './oferta.utils';

const { Title } = Typography;

const CarreraTable: React.FC = () => {
  const [carreras, setCarreras] = useState<ICarrera[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCarrera, setCurrentCarrera] = useState<ICarrera | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchCarreras();
      setCarreras(data);
    } catch (error: unknown) {
      message.error(error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id: number) => {
    setFormLoading(true);
    try {
      const carrera = await fetchCarreraById(id);
      setCurrentCarrera(carrera);
      setModalOpen(true);
    } catch (error: unknown) {
      message.error(error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setFormLoading(false);
    }
  };

  const handleSubmit = async (values: ICarreraFormData) => {
    try {
      setFormLoading(true);
      const transformedData = transformFormToCreate(values);
      
      if (currentCarrera?.id) {
        await updateCarrera(currentCarrera.id, transformedData);
        message.success('Carrera actualizada correctamente');
      } else {
        await createCarrera(transformedData);
        message.success('Carrera creada correctamente');
      }
      
      loadData();
      setModalOpen(false);
    } catch (error: unknown) {
      message.error(error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    Modal.confirm({
      title: '¿Eliminar carrera?',
      content: 'Esta acción no se puede deshacer',
      onOk: async () => {
        try {
          await deleteCarrera(id);
          message.success('Carrera eliminada');
          loadData();
        } catch (error: unknown) {
          message.error(error instanceof Error ? error.message : 'Error desconocido');
        }
      },
    });
  };

  const columns: ColumnsType<ICarrera> = [
    {
      title: 'Título',
      dataIndex: 'title',
      render: (text: string, record: ICarrera) => (
        <Space>
          <Tag color={record.bg_color}>
            {record.tipo}
          </Tag>
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      ellipsis: true,
      render: (text: string) => text || '--',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_: unknown, record: ICarrera) => (
        <Space>
          <Button onClick={() => handleEdit(record.id)}>Editar</Button>
          <Button danger onClick={() => handleDelete(record.id)}>Eliminar</Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Card
      title={<Title level={4}>Gestión de Carreras</Title>}
      extra={
        <Button 
          type="primary" 
          onClick={() => {
            setCurrentCarrera(null);
            setModalOpen(true);
          }}
        >
          Nueva Carrera
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={carreras}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title={currentCarrera ? `Editar ${currentCarrera.title}` : 'Nueva Carrera'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        width={800}
        destroyOnClose
      >
        <CarreraForm
          initialValues={currentCarrera ? transformCarreraToForm(currentCarrera) : undefined}
          onSubmit={handleSubmit}
          loading={formLoading}
        />
      </Modal>
    </Card>
  );
};

export default CarreraTable;
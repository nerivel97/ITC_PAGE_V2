import React, { useState, useEffect } from 'react';
import { Table, Card, Button, Modal, Tag, Typography, Space, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { 
  fetchOfertas, 
  deleteOferta,
  fetchOfertaById,
  createOferta,
  updateOferta
} from '../../services/ofertas.service';
import OfertForm from './OfertForm';
import { IOferta, IOfertaFormData } from '../../interfaces/oferta.interface';
import { transformFormToCreate, transformOfertaToForm } from './oferta.utils';

const { Title } = Typography;

const OfertTable: React.FC = () => {
  const [ofertas, setOfertas] = useState<IOferta[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentOferta, setCurrentOferta] = useState<IOferta | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchOfertas();
      setOfertas(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        message.error(error.message || 'Error al cargar carreras');
      } else {
        message.error('Error desconocido al cargar carreras');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id: number) => {
    setFormLoading(true);
    try {
      const oferta = await fetchOfertaById(id);
      setCurrentOferta(oferta);
      setModalOpen(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        message.error(error.message || 'Error al cargar carrera');
      } else {
        message.error('Error desconocido al cargar carrera');
      }
    } finally {
      setFormLoading(false);
    }
  };

  const handleSubmit = async (values: IOfertaFormData) => {
    try {
      setFormLoading(true);
      if (currentOferta?.id) {
        const updateData = {
          ...transformFormToCreate(values),
          id: currentOferta.id
        };
        await updateOferta(updateData.id, updateData);
        message.success('Carrera actualizada correctamente');
      } else {
        await createOferta(transformFormToCreate(values));
        message.success('Carrera creada correctamente');
      }
      loadData();
      setModalOpen(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        message.error(error.message || 'Error al guardar carrera');
      } else {
        message.error('Error desconocido al guardar carrera');
      }
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
          await deleteOferta(id);
          message.success('Carrera eliminada');
          loadData();
        } catch (error: unknown) {
          if (error instanceof Error) {
            message.error(error.message || 'Error al eliminar carrera');
          } else {
            message.error('Error desconocido al eliminar carrera');
          }
        }
      },
    });
  };

  const columns: ColumnsType<IOferta> = [
    {
      title: 'Título',
      dataIndex: 'titulo',
      render: (text: string, record: IOferta) => (
        <Space>
          <Tag color={record.bgColor}>
            {record.tipo}
          </Tag>
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      ellipsis: true,
      render: (text: string) => text || '--',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_: unknown, record: IOferta) => (
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
            setCurrentOferta(null);
            setModalOpen(true);
          }}
        >
          Nueva Carrera
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={ofertas}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title={currentOferta ? `Editar ${currentOferta.titulo}` : 'Nueva Carrera'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        width={800}
        destroyOnClose
      >
        <OfertForm
          initialValues={currentOferta ? transformOfertaToForm(currentOferta) : undefined}
          onSubmit={handleSubmit}
          loading={formLoading}
        />
      </Modal>
    </Card>
  );
};

export default OfertTable;
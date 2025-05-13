import React, { useEffect, useState } from 'react';
import {
  Button,
  Table,
  Modal,
  Space,
  Tag,
  Card,
  Typography,
  message
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import OfertForm from './OfertForm';
import { fetchOfertas, deleteOferta } from '../../services/ofertas.service';
import { IOferta } from '../../interfaces/oferta.interface';

const { Text } = Typography;

const OfertTable: React.FC = () => {
  const [ofertas, setOfertas] = useState<IOferta[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOferta, setSelectedOferta] = useState<IOferta | null>(null);

  const loadOfertas = async () => {
    setLoading(true);
    try {
      const data = await fetchOfertas();
      setOfertas(
        data.map((oferta) => ({
          ...oferta,
          key: oferta.id?.toString() || Math.random().toString(),
        }))
      );
    } catch (error) {
      message.error('Error al cargar ofertas');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOfertas();
  }, []);

  const handleDelete = async (id: number) => {
    Modal.confirm({
      title: '¿Eliminar oferta?',
      content: 'Esta acción no se puede deshacer',
      okText: 'Eliminar',
      cancelText: 'Cancelar',
      okButtonProps: { danger: true },
      onOk: async () => {
        try {
          await deleteOferta(id);
          message.success('Oferta eliminada');
          loadOfertas();
        } catch (error) {
          message.error('Error al eliminar la oferta');
        }
      },
    });
  };

  const columns: ColumnsType<IOferta> = [
    {
      title: 'Título',
      dataIndex: 'titulo',
      key: 'titulo',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      key: 'descripcion',
      render: (text: string) => <Text>{text}</Text>,
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
      render: (color: string) => <Tag color={color}>{color}</Tag>,
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => {
              setSelectedOferta(record);
              setModalVisible(true);
            }}
          >
            Editar
          </Button>
          <Button danger onClick={() => handleDelete(record.id!)}>
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="Gestión de Ofertas"
      extra={
        <Button
          type="primary"
          onClick={() => {
            setSelectedOferta(null);
            setModalVisible(true);
          }}
        >
          Nueva Oferta
        </Button>
      }
    >
      <Table columns={columns} dataSource={ofertas} loading={loading} rowKey="key" />

      {/* Modal con formulario */}
      <Modal
        title={selectedOferta ? 'Editar Oferta' : 'Nueva Oferta'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={900}
      >
        <OfertForm
          oferta={selectedOferta}
          onSuccess={() => {
            setModalVisible(false);
            loadOfertas();
          }}
          onCancel={() => setModalVisible(false)}
        />
      </Modal>
    </Card>
  );
};

export default OfertTable;

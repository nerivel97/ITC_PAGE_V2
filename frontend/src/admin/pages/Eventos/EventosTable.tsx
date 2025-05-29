import React, { useEffect, useState } from 'react';
import {
  Button,
  Table,
  Space,
  Modal,
  message,
  Tag,
  Card,
  Image,
  Typography,
  Spin,
  Empty
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import EventoForm from './EventoForm';
import { fetchEventos, deleteEvento } from '../../services/eventos.service';
import { IEvento } from '../../interfaces/evento.interface';
import styles from './EventosTable.module.css';

const { Text } = Typography;

const EventosTable: React.FC = () => {
  const [eventos, setEventos] = useState<IEvento[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvento, setSelectedEvento] = useState<IEvento | null>(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const loadEventos = async () => {
    setLoading(true);
    try {
      const data = await fetchEventos();
      
      // Verificar estructura de respuesta del backend
      if (!Array.isArray(data)) {
        throw new Error('Formato de datos inválido');
      }

      const formattedData = data.map(evento => ({
        ...evento,
        key: evento.id_evento?.toString(),
        fecha_inicio: evento.fecha_inicio, // Ya viene en formato string
        fecha_final: evento.fecha_final    // Ya viene en formato string
      }));

      setEventos(formattedData);
      setPagination(prev => ({
        ...prev,
        total: formattedData.length
      }));
    } catch (error) {
      console.error('Error al cargar eventos:', error);
      message.error(error instanceof Error ? error.message : 'Error al cargar eventos');
      setEventos([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadEventos();
  }, []);

  const handleDelete = (id: number) => {
    console.log('Botón eliminar clickeado para ID:', id); // Verifica que se ejecuta

    Modal.confirm({
      title: '¿Eliminar evento?',
      content: 'Esta acción no se puede deshacer',
      okText: 'Eliminar',
      cancelText: 'Cancelar',
      okButtonProps: { danger: true },
      onOk: async () => {
        console.log('Usuario confirmó eliminación'); // Verifica confirmación
        try {
          await deleteEvento(id);
          message.success('Evento eliminado correctamente');
          await loadEventos();
        } catch (error) {
          console.error('Error completo:', error);
          message.error('Error al eliminar: ' + (error instanceof Error ? error.message : ''));
        }
      },
      onCancel: () => {
        console.log('Usuario canceló eliminación');
      }
    });
  };

  const columns: ColumnsType<IEvento> = [
    {
      title: 'ID',
      dataIndex: 'id_evento',
      key: 'id_evento',
      width: 80,
      sorter: (a, b) => (a.id_evento || 0) - (b.id_evento || 0),
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre_evento',
      key: 'nombre_evento',
      width: 200,
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'Categoría',
      dataIndex: 'categoria',
      key: 'categoria',
      width: 150,
      render: (categoria: string) => (
        <Tag color="geekblue">
          {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
        </Tag>
      ),
      filters: [
        { text: 'Cultural', value: 'cultural' },
        { text: 'Deportivo', value: 'deportivo' },
        { text: 'Social', value: 'social' },
      ],
      onFilter: (value, record) => record.categoria === value,
    },
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      key: 'descripcion',
      ellipsis: true,
      render: (descripcion: string) => (
        <Text ellipsis={{ tooltip: descripcion }}>
          {descripcion}
        </Text>
      ),
    },
    {
      title: 'Fechas',
      key: 'fechas',
      width: 200,
      render: (_, record) => (
        <div className={styles.dateContainer}>
          <div>
            <Text type="secondary">Inicio:</Text>{' '}
            {record.fecha_inicio ? new Date(record.fecha_inicio).toLocaleDateString('es-ES') : 'N/A'}
          </div>
          <div>
            <Text type="secondary">Fin:</Text>{' '}
            {record.fecha_final ? new Date(record.fecha_final).toLocaleDateString('es-ES') : 'N/A'}
          </div>
        </div>
      ),
      sorter: (a, b) => new Date(a.fecha_inicio).getTime() - new Date(b.fecha_inicio).getTime(),
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      width: 120,
      render: (estado: string) => {
        const statusMap: Record<string, { color: string; text: string }> = {
          activo: { color: 'green', text: 'Activo' },
          inactivo: { color: 'red', text: 'Inactivo' },
        };

        const status = statusMap[estado.toLowerCase()] || { color: 'gray', text: estado };
        return (
          <Tag color={status.color}>
            {status.text}
          </Tag>
        );
      },
      filters: [
        { text: 'Activo', value: 'activo' },
        { text: 'Inactivo', value: 'inactivo' },
      ],
      onFilter: (value, record) => record.estado.toLowerCase() === value.toString().toLowerCase(),
    },
    {
      title: 'Imagen',
      dataIndex: 'imagen',
      key: 'imagen',
      width: 120,
      render: (imagenUrl: string) => (
        imagenUrl ? (
          <Image
            src={imagenUrl}
            width={60}
            height={40}
            style={{ objectFit: 'cover', borderRadius: 4 }}
            placeholder={
              <div className={styles.imagePlaceholder}>
                <Text type="secondary">Imagen</Text>
              </div>
            }
          />
        ) : (
          <Tag color="default">Sin imagen</Tag>
        )
      ),
    },
    {
      title: 'Acciones',
      key: 'actions',
      width: 150,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small" onClick={(e) => e.stopPropagation()}>
          <Button
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedEvento(record);
              setModalVisible(true);
            }}
          >
            Editar
          </Button>
          <Button
            danger
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleDelete(record.id_evento!);
            }}
            style={{ position: 'relative', zIndex: 1 }}
          >
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="Administración de Eventos"
      variant="outlined"
      extra={
        <Button
          type="primary"
          onClick={() => {
            setSelectedEvento(null);
            setModalVisible(true);
          }}
        >
          Nuevo Evento
        </Button>
      }
      className={styles.card}
    >
      <Spin spinning={loading} tip="Cargando eventos...">
        <Table
          columns={columns}
          dataSource={eventos}
          rowKey="key"
          loading={loading}
          scroll={{ x: 1500 }}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50'],
            showTotal: (total) => `Total ${total} eventos`,
          }}
          locale={{
            emptyText: (
              <Empty
                description="No se encontraron eventos"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              >
                <Button
                  type="primary"
                  onClick={() => setModalVisible(true)}
                >
                  Crear primer evento
                </Button>
              </Empty>
            )
          }}
        />
      </Spin>

      <EventoForm
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSuccess={() => {
          setModalVisible(false);
          loadEventos();
        }}
        evento={selectedEvento}
      />
    </Card>
  );
};

export default EventosTable;
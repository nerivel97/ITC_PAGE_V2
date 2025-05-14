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
import NoticiasForm from './NoticiasForm';
import { fetchNoticias, deleteNoticia } from '../../services/noticias.service';
import { INoticia } from '../../interfaces/noticia.interface';
import styles from './NoticiasTable.module.css';

const { Text } = Typography;

const NoticiasTable: React.FC = () => {
  const [Noticias, setNoticias] = useState<INoticia[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectednoticia, setSelectednoticia] = useState<INoticia | null>(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const loadNoticias = async () => {
    setLoading(true);
    try {
      const data = await fetchNoticias();
      console.log('Datos recibidos del backend:', data);

      if (!Array.isArray(data)) {
        throw new Error('Formato de datos inválido');
      }

      const formattedData = data.map(noticia => ({
        ...noticia,
        key: noticia.id_noticia?.toString() || Math.random().toString(),
        fecha_publicacion: noticia.fecha_publicacion ? new Date(noticia.fecha_publicacion).toISOString() : '',
      }));

      setNoticias(formattedData);
      setPagination(prev => ({
        ...prev,
        total: formattedData.length
      }));
    } catch (error) {
      console.error('Error al cargar Noticias:', error);
      message.error(error instanceof Error ? error.message : 'Error al cargar Noticias');
      setNoticias([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNoticias();
  }, []);

  const handleDelete = (id: number) => {
    console.log('Botón eliminar clickeado para ID:', id); // Verifica que se ejecuta

    Modal.confirm({
      title: '¿Eliminar noticia?',
      content: 'Esta acción no se puede deshacer',
      okText: 'Eliminar',
      cancelText: 'Cancelar',
      okButtonProps: { danger: true },
      onOk: async () => {
        console.log('Usuario confirmó eliminación'); // Verifica confirmación
        try {
          await deleteNoticia(id);
          message.success('Noticia eliminado correctamente');
          await loadNoticias();
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

  const columns: ColumnsType<INoticia> = [
    {
      title: 'ID',
      dataIndex: 'id_noticia',
      key: 'id_noticia',
      width: 50,
      sorter: (a, b) => (a.id_noticia || 0) - (b.id_noticia || 0),
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre_noticia',
      key: 'nombre_noticia',
      width: 200,
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      key: 'descripcion',
      width: 200,
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
      width: 100,
      render: (_, record) => (
        <div className={styles.dateContainer}>
          <div>
            <Text type="secondary">Inicio:</Text>{' '}
            {record.fecha_publicacion ? new Date(record.fecha_publicacion).toLocaleDateString('es-ES') : 'N/A'}
          </div>
        </div>
      ),
      sorter: (a, b) => new Date(a.fecha_publicacion).getTime() - new Date(b.fecha_publicacion).getTime(),
    },
    {
      title: 'Autor',
      dataIndex: 'autor',
      key: 'autor',
      width: 100,
      render: (text: string) => <Text strong>{text}</Text>,
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
              setSelectednoticia(record);
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
              handleDelete(record.id_noticia!);
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
      title="Administración de Noticias"
      variant="outlined"
      extra={
        <Button
          type="primary"
          onClick={() => {
            setSelectednoticia(null);
            setModalVisible(true);
          }}
        >
          Nueva noticia
        </Button>
      }
      className={styles.card}
    >
      <Spin spinning={loading} tip="Cargando Noticias...">
        <Table
          columns={columns}
          dataSource={Noticias}
          rowKey="key"
          loading={loading}
          scroll={{ x: 1500 }}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50'],
            showTotal: (total) => `Total ${total} Noticias`,
          }}
          locale={{
            emptyText: (
              <Empty
                description="No se encontraron Noticias"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              >
                <Button
                  type="primary"
                  onClick={() => setModalVisible(true)}
                >
                  Crear primer noticia
                </Button>
              </Empty>
            )
          }}
        />
      </Spin>

      <NoticiasForm
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSuccess={() => {
          setModalVisible(false);
          loadNoticias();
        }}
        noticia={selectednoticia}
      />
    </Card>
  );
};

export default NoticiasTable;
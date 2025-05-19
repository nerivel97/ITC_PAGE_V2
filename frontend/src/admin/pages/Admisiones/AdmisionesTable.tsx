import React, { useEffect, useState } from 'react';
import {
  Button,
  Table,
  //TODO Space,
  Modal,
  message,
  Typography,
  Spin,
  Empty,
  Card,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import AdmisionForm from './AdmisionForm';
//TODO import RequisitoForm from './AdmisionForm';
//TODO import ProcesoForm from './AdmisionForm';
import {
  fetchAdmisiones,
  //fetchRequisitos,
  //fetchProcesos,
  //deleteAdmision
} from '../../services/admisiones.service';
import { IAdmision } from '../../interfaces/admision.interface';
import { IRequisito } from '../../interfaces/admision.interface';
import { IProceso } from '../../interfaces/admision.interface';
import styles from './AdmisionesTable.module.css';

const { Text } = Typography;

const AdmisionesTable: React.FC = () => {
  const [admisiones, setAdmisiones] = useState<IAdmision[]>([]);
  //const [requisitos, setRequisitos] = useState<IRequisito[]>([]);
  //const [procesos, setProcesos] = useState<IProceso[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'admision' | 'requisito' | 'proceso'>('admision');
  const [selectedAdmision, setSelectedAdmision] = useState<IAdmision | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [admData/*, reqData, procData*/] = await Promise.all([
        fetchAdmisiones(),
        /* fetchRequisitos(),
        fetchProcesos() */
      ]);

      const formattedAdmisiones = admData.map(admision => ({
        ...admision,
        key: admision.id_admision?.toString() || Math.random().toString(),
        //fecha_solicitud: admision.fecha_solicitud ? new Date(admision.fecha_solicitud).toISOString() : ''
      }));

      setAdmisiones(formattedAdmisiones);
      //setRequisitos(reqData);
      //setProcesos(procData);
    } catch (error) {
      console.error(error);
      message.error('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  /* TODO const handleDelete = (id: number) => {
    Modal.confirm({
      title: '¿Eliminar solicitud de admisión?',
      content: 'Esta acción no se puede deshacer',
      okText: 'Eliminar',
      cancelText: 'Cancelar',
      okButtonProps: { danger: true },
      onOk: async () => {
        try {
          await deleteAdmision(id);
          message.success('Solicitud eliminada correctamente');
          await loadData();
        } catch (error) {
          console.error('Error al eliminar:', error);
          message.error('Error al eliminar');
        }
      }
    });
  }; */

  const admisionColumns: ColumnsType<IAdmision> = [
    {
      title: 'ID_Convocatoria',
      dataIndex: 'id_admision',
      key: 'id_admision',
      width: 80,
      sorter: (a, b) => (a.id_admision || 0) - (b.id_admision || 0),
    },
    {
      title: 'Año',
      dataIndex: 'anio',
      key: 'anio',
      width: 120,
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'Periodo',
      dataIndex: 'periodo',
      key: 'periodo',
      width: 120,
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'Fecha de Inicio',
      dataIndex: 'fecha_inicio',
      key: 'fecha_inicio',
      width: 150,
      render: (fecha: string) => (
        fecha ? new Date(fecha).toLocaleDateString('es-ES') : 'N/A'
      ),
    },
    {
      title: 'Fecha de Fin',
      dataIndex: 'fecha_fin',
      key: 'fecha_fin',
      width: 150,
      render: (fecha: string) => (
        fecha ? new Date(fecha).toLocaleDateString('es-ES') : 'N/A'
      ),
    },
 /*   {
      title: 'Acciones',
      key: 'acciones',
      width: 120,
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => {
              setSelectedAdmision(record);
              setModalType('admision');
              setModalVisible(true);
            }}
          >
            Editar
          </Button>
          <Button danger onClick={() => handleDelete(record.id_admision!)}>
            Eliminar
          </Button>
        </Space>
      ),
    },...*/
  ];

  const requisitosColumns: ColumnsType<IRequisito> = [
    {
      title: 'ID',
      dataIndex: 'id_requisito',
      key: 'id_requisito',
      width: 100,
    },
    {
      title: 'ID Convocatoria',
      dataIndex: 'id_convocatoria',
      key: 'id_convocatoria',
      width: 150,
    },
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      key: 'descripcion',
    },
  ];

  const procesosColumns: ColumnsType<IProceso> = [
    {
      title: 'ID',
      dataIndex: 'id_proceso',
      key: 'id_proceso',
      width: 100,
    },
    {
      title: 'ID Convocatoria',
      dataIndex: 'id_convocatoria',
      key: 'id_convocatoria',
      width: 150,
    },
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      key: 'descripcion',
    },
  ];

  return (
    <>
      <Card
        title="Administración de Admisiones"
        extra={
          <Button
            type="primary"
            onClick={() => {
              setSelectedAdmision(null);
              setModalType('admision');
              setModalVisible(true);
            }}
          >
            Nueva Admisión
          </Button>
        }
      >
        {loading ? (
          <div style={{ textAlign: 'center', padding: 50 }}>
            <Spin size="large" />
          </div>
        ) : admisiones.length === 0 ? (
          <Empty
            description={
              <div>
                <p>No se encontraron admisiones</p>
                <Button
                  type="primary"
                  onClick={() => {
                    setSelectedAdmision(null);
                    setModalType('admision');
                    setModalVisible(true);
                  }}
                >
                  Crear primera admisión
                </Button>
              </div>
            }
          />
        ) : (
          <Table
            columns={admisionColumns}
            dataSource={admisiones}
            pagination={{ pageSize: 10 }}
            rowClassName={styles.tableRow}
          />
        )}
      </Card>

      <Card
        title="Requisitos"
        style={{ marginTop: 24 }}
        extra={
          <Button
            type="primary"
            onClick={() => {
              setModalType('requisito');
              setModalVisible(true);
            }}
          >
            Nuevo Requisito
          </Button>
        }
      >
        <Table
          columns={requisitosColumns}
          //dataSource={requisitos}
          rowKey="id_requisito"
          pagination={{ pageSize: 5 }}
        />
      </Card>

      <Card
        title="Procesos"
        style={{ marginTop: 24 }}
        extra={
          <Button
            type="primary"
            onClick={() => {
              setModalType('proceso');
              setModalVisible(true);
            }}
          >
            Nuevo Proceso
          </Button>
        }
      >
        <Table
          columns={procesosColumns}
          //dataSource={procesos}
          rowKey="id_proceso"
          pagination={{ pageSize: 5 }}
        />
      </Card>

      <Modal
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        {modalType === 'admision' && (
          <AdmisionForm
            admision={selectedAdmision}
            onCancel={() => setModalVisible(false)}
            onSuccess={() => {
              setModalVisible(false);
              loadData();
            }}
          />
        )}
        {modalType === 'requisito' && (
          <AdmisionForm
            admision={selectedAdmision}
            onCancel={() => setModalVisible(false)}
            onSuccess={() => {
              setModalVisible(false);
              loadData();
            }}
          />
        )}
        {modalType === 'proceso' && (
          <AdmisionForm
            admision={selectedAdmision}
            onCancel={() => setModalVisible(false)}
            onSuccess={() => {
              setModalVisible(false);
              loadData();
            }}
          />
        )}
      </Modal>
    </>
  );
};

export default AdmisionesTable;

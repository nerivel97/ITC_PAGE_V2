import AppDataSource from '../config/database';
import { 
  ICarrera, 
  ICarreraCreate, 
  ICarreraUpdate,
  ICampoLaboral,
  IFuncionProfesional,
  IMisionVisionObjetivo,
  IPerfilAlumno
} from '../interfaces/carrera.interface';
import { ICarreraService } from '../interfaces/service.interface';
import { Carrera } from '../models/Carrera.entity';
import { CampoLaboral } from '../models/CampoLaboral.entity';
import { FuncionProfesional } from '../models/FuncionProfesional.entity';
import { MisionVisionObjetivo } from '../models/MisionVisionObjetivo.entity';
import { PerfilAlumno } from '../models/PerfilAlumno.entity';
import { ApiError } from '../utils/apiError';

export class CarreraService implements ICarreraService {
  private carreraRepository = AppDataSource.getRepository(Carrera);
  private campoLaboralRepository = AppDataSource.getRepository(CampoLaboral);
  private funcionProfesionalRepository = AppDataSource.getRepository(FuncionProfesional);
  private mvoRepository = AppDataSource.getRepository(MisionVisionObjetivo);
  private perfilAlumnoRepository = AppDataSource.getRepository(PerfilAlumno);

  async getAllCarreras(): Promise<ICarrera[]> {
    try {
      return await this.carreraRepository
        .createQueryBuilder('carrera')
        .select([
          'carrera.id',       // Opcional, útil para identificar registros
          'carrera.titulo',
          'carrera.tipo',
          'carrera.bgColor',
          'carrera.descripcion'
        ])
        .orderBy('carrera.titulo', 'ASC')
        .getMany();
    } catch (error) {
      throw new ApiError(500, 'Error al obtener las carreras');
    }
  }

  async getCarreraById(id: number): Promise<ICarrera | null> {
    try {
      return await this.carreraRepository.findOne({ 
        where: { id },
        relations: [
          'camposLaborales',
          'funcionesProfesionales',
          'misionesVisionesObjetivos',
          'perfilesAlumno'
        ]
      });
    } catch (error) {
      throw new ApiError(500, 'Error al obtener la carrera');
    }
  }

  async createCarrera(carreraData: ICarreraCreate): Promise<ICarrera> {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Crear carrera principal
      const carrera = this.carreraRepository.create(carreraData);
      const savedCarrera = await queryRunner.manager.save(carrera);

      // Guardar relaciones si existen
      if (carreraData.camposLaborales?.length) {
        const campos = carreraData.camposLaborales.map(cl => ({
          ...cl,
          carrera: savedCarrera
        }));
        await queryRunner.manager.save(CampoLaboral, campos);
      }

      if (carreraData.funcionesProfesionales?.length) {
        const funciones = carreraData.funcionesProfesionales.map(fp => ({
          ...fp,
          carrera: savedCarrera
        }));
        await queryRunner.manager.save(FuncionProfesional, funciones);
      }

      if (carreraData.misionesVisionesObjetivos?.length) {
        const mvos = carreraData.misionesVisionesObjetivos.map(mvo => ({
          ...mvo,
          carrera: savedCarrera
        }));
        await queryRunner.manager.save(MisionVisionObjetivo, mvos);
      }

      if (carreraData.perfilesAlumno?.length) {
        const perfiles = carreraData.perfilesAlumno.map(pa => ({
          ...pa,
          carrera: savedCarrera
        }));
        await queryRunner.manager.save(PerfilAlumno, perfiles);
      }

      await queryRunner.commitTransaction();
      return await this.getCarreraById(savedCarrera.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Error al crear carrera:', error);
      
      if (error instanceof Error && error.message.includes('duplicate key')) {
        throw new ApiError(400, 'El urlSlug ya está en uso');
      }
      
      throw new ApiError(400, 'Error al crear la carrera');
    } finally {
      await queryRunner.release();
    }
  }

  async updateCarrera(id: number, carreraData: ICarreraUpdate): Promise<ICarrera | null> {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Transformar datos a snake_case para TypeORM
      const updateData = {
        urlSlug: carreraData.urlSlug,
        titulo: carreraData.titulo,
        tipo: carreraData.tipo,
        imagenBanner: carreraData.imagenBanner,
        bgColor: carreraData.bgColor,
        fotoMascota: carreraData.fotoMascota,
        descripcion: carreraData.descripcion,
        fotoIngreso: carreraData.fotoIngreso,
        fotoEgreso: carreraData.fotoEgreso
      };

      // 2. Actualizar solo los campos que existen en el payload
      const filteredData = Object.fromEntries(
        Object.entries(updateData).filter(([_, v]) => v !== undefined)
      );

      // 3. Actualizar carrera principal
      await queryRunner.manager.update(Carrera, id, filteredData);

      // 4. Actualizar relaciones (mantén tu lógica actual pero verifica snake_case)
      if (carreraData.camposLaborales) {
        await queryRunner.manager.delete(CampoLaboral, { carrera: { id } });
        const campos = carreraData.camposLaborales.map(cl => ({
          descripcion: cl.descripcion,
          orden: cl.orden,
          carrera: { id } // CORRECTO para establecer la relación
        }));
        await queryRunner.manager.save(CampoLaboral, campos);
      }

      if (carreraData.funcionesProfesionales) {
        await queryRunner.manager.delete(FuncionProfesional, { carrera: { id } });
        const funciones = carreraData.funcionesProfesionales.map(fp => ({
          descripcion: fp.descripcion,
          orden: fp.orden,
          carrera: { id }
        }));
        await queryRunner.manager.save(FuncionProfesional, funciones);
      }

      if (carreraData.misionesVisionesObjetivos) {
        await queryRunner.manager.delete(MisionVisionObjetivo, { carrera: { id } });
        const mvo = carreraData.misionesVisionesObjetivos.map(m => ({
          tipo: m.tipo,
          contenido: m.contenido,
          orden: m.orden,
          carrera: { id }
        }));
        await queryRunner.manager.save(MisionVisionObjetivo, mvo);
      }

      if (carreraData.perfilesAlumno) {
        await queryRunner.manager.delete(PerfilAlumno, { carrera: { id } });
        const perfiles = carreraData.perfilesAlumno.map(p => ({
          tipo: p.tipo,
          descripcion: p.descripcion,
          carrera: { id }
        }));
        await queryRunner.manager.save(PerfilAlumno, perfiles);
      }

      await queryRunner.commitTransaction();
      return await this.getCarreraById(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Error detallado en updateCarrera:', {
        error: error.message,
        stack: error.stack,
        data: carreraData
      });
      
      throw new ApiError(500, 'Error al actualizar la carrera: ' + error.message);
    } finally {
      await queryRunner.release();
    }
  }

  async deleteCarrera(id: number): Promise<void> {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Eliminar relaciones primero
      await queryRunner.manager.delete(CampoLaboral, { carrera: { id } });
      await queryRunner.manager.delete(FuncionProfesional, { carrera: { id } });
      await queryRunner.manager.delete(MisionVisionObjetivo, { carrera: { id } });
      await queryRunner.manager.delete(PerfilAlumno, { carrera: { id } });

      // Eliminar carrera
      const result = await queryRunner.manager.delete(Carrera, id);
      
      if (result.affected === 0) {
        throw new ApiError(404, 'Carrera no encontrada');
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Error al eliminar carrera:', error);
      
      if (error instanceof Error && 'code' in error && error.code === '23503') {
        throw new ApiError(400, 'No se puede eliminar la carrera porque tiene registros relacionados');
      }
      
      throw new ApiError(500, 'Error al eliminar la carrera');
    } finally {
      await queryRunner.release();
    }
  }
}
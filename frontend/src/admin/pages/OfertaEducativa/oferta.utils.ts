import { 
  IOferta, 
  IOfertaFormData,
  IMisionVisionObjetivo,
  IPerfilAlumno,
  ICampoLaboral,
  IFuncionProfesional
} from '../../interfaces/oferta.interface';

export const transformFormToCreate = (data: IOfertaFormData) => {
  const result: IOfertaCreate = {
    titulo: data.titulo,
    urlSlug: data.urlSlug,
    tipo: data.tipo,
    descripcion: data.descripcion,
    bgColor: data.bgColor,
    imagenBanner: data.imagenBanner,
    fotoMascota: data.fotoMascota,
    fotoIngreso: data.fotoIngreso,
    fotoEgreso: data.fotoEgreso,
    misionesVisionesObjetivos: [
      ...(data.misiones?.map((contenido: string, i: number) => ({
        tipo: 'mision' as const,
        contenido,
        orden: i + 1
      })) || []),
      ...(data.visiones?.map((contenido: string, i: number) => ({
        tipo: 'vision' as const,
        contenido,
        orden: i + 1
      })) || []),
      ...(data.objetivos?.map((contenido: string, i: number) => ({
        tipo: 'objetivo' as const,
        contenido,
        orden: i + 1
      })) || [])
    ],
    perfilesAlumno: [
      { tipo: 'ingreso' as const, descripcion: data.perfilIngreso || '' },
      { tipo: 'egreso' as const, descripcion: data.perfilEgreso || '' }
    ].filter((p: { descripcion: string }) => p.descripcion),
    camposLaborales: (data.camposLaborales || []).map((descripcion: string, i: number) => ({
      descripcion,
      orden: i + 1
    })),
    funcionesProfesionales: (data.funcionesProfesionales || []).map((descripcion: string, i: number) => ({
      descripcion,
      orden: i + 1
    })),
    duracion: data.duracion,
    creditos: data.creditos,
    modalidad: data.modalidad
  };
  return result;
};

export const transformOfertaToForm = (oferta: IOferta): IOfertaFormData => {
  return {
    id: oferta.id,
    titulo: oferta.titulo,
    urlSlug: oferta.urlSlug,
    tipo: oferta.tipo,
    descripcion: oferta.descripcion,
    bgColor: oferta.bgColor,
    imagenBanner: oferta.imagenBanner ?? undefined,
    fotoMascota: oferta.fotoMascota ?? undefined,
    fotoIngreso: oferta.fotoIngreso ?? undefined,
    fotoEgreso: oferta.fotoEgreso ?? undefined,
    misiones: oferta.misionesVisionesObjetivos
      .filter((m: IMisionVisionObjetivo) => m.tipo === 'mision')
      .map((m: IMisionVisionObjetivo) => m.contenido),
    visiones: oferta.misionesVisionesObjetivos
      .filter((m: IMisionVisionObjetivo) => m.tipo === 'vision')
      .map((m: IMisionVisionObjetivo) => m.contenido),
    objetivos: oferta.misionesVisionesObjetivos
      .filter((m: IMisionVisionObjetivo) => m.tipo === 'objetivo')
      .map((m: IMisionVisionObjetivo) => m.contenido),
    perfilIngreso: oferta.perfilesAlumno.find((p: IPerfilAlumno) => p.tipo === 'ingreso')?.descripcion || '',
    perfilEgreso: oferta.perfilesAlumno.find((p: IPerfilAlumno) => p.tipo === 'egreso')?.descripcion || '',
    camposLaborales: oferta.camposLaborales.map((c: ICampoLaboral) => c.descripcion),
    funcionesProfesionales: oferta.funcionesProfesionales.map((f: IFuncionProfesional) => f.descripcion),
    duracion: oferta.duracion,
    creditos: oferta.creditos,
    modalidad: oferta.modalidad
  };
};

interface IOfertaCreate {
  titulo: string;
  urlSlug: string;
  tipo: 'licenciatura' | 'maestria' | 'doctorado';
  descripcion: string;
  bgColor: string;
  imagenBanner?: string | null;
  fotoMascota?: string | null;
  fotoIngreso?: string | null;
  fotoEgreso?: string | null;
  misionesVisionesObjetivos: Array<{
    tipo: 'mision' | 'vision' | 'objetivo';
    contenido: string;
    orden: number;
  }>;
  perfilesAlumno: Array<{ tipo: 'ingreso' | 'egreso'; descripcion: string }>;
  camposLaborales: Array<{ descripcion: string; orden: number }>;
  funcionesProfesionales: Array<{ descripcion: string; orden: number }>;
  duracion?: string;
  creditos?: number;
  modalidad?: string;
}
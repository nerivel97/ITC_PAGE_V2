import { ICarrera, ICarreraFormData } from '../../interfaces/oferta.interface';

export function formDataToCarrera(data: ICarreraFormData): ICarrera {
  return {
    id: data.id ?? 0,
    title: data.title,
    url_slug: data.url_slug,
    tipo: data.tipo,
    description: data.description,
    bg_color: data.bg_color,
    imagen_banner: data.imagen_banner,
    foto_mascota: data.foto_mascota,
    foto_ingreso: data.foto_ingreso,
    foto_egreso: data.foto_egreso,

    mision_vision_objetivos: [
      ...(data.misiones?.map((contenido, i) => ({
        tipo: 'mision' as const,
        contenido,
        orden: i + 1,
      })) ?? []),
      ...(data.visiones?.map((contenido, i) => ({
        tipo: 'vision' as const,
        contenido,
        orden: i + 1,
      })) ?? []),
      ...(data.objetivos?.map((contenido, i) => ({
        tipo: 'objetivo' as const,
        contenido,
        orden: i + 1,
      })) ?? []),
    ],

    perfil_alumno: [
      { tipo: 'ingreso', descripcion: data.perfil_ingreso || '' },
      { tipo: 'egreso', descripcion: data.perfil_egreso || '' },
    ],

    campos_laborales: (data.campos_laborales ?? []).map((descripcion, i) => ({
      descripcion,
      orden: i + 1,
    })),

    funciones_profesionales: (data.funciones_profesionales ?? []).map((descripcion, i) => ({
      descripcion,
      orden: i + 1,
    })),
  };
}

export function carreraToFormData(carrera: ICarrera): ICarreraFormData {
  return {
    id: carrera.id,
    title: carrera.title,
    url_slug: carrera.url_slug,
    tipo: carrera.tipo,
    description: carrera.description,
    bg_color: carrera.bg_color,
    imagen_banner: carrera.imagen_banner,
    foto_mascota: carrera.foto_mascota,
    foto_ingreso: carrera.foto_ingreso,
    foto_egreso: carrera.foto_egreso,

    misiones: carrera.mision_vision_objetivos
      ?.filter(item => item.tipo === 'mision')
      .sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0))
      .map(item => item.contenido) ?? [],

    visiones: carrera.mision_vision_objetivos
      ?.filter(item => item.tipo === 'vision')
      .sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0))
      .map(item => item.contenido) ?? [],

    objetivos: carrera.mision_vision_objetivos
      ?.filter(item => item.tipo === 'objetivo')
      .sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0))
      .map(item => item.contenido) ?? [],

    perfil_ingreso: carrera.perfil_alumno?.find(p => p.tipo === 'ingreso')?.descripcion ?? '',
    perfil_egreso: carrera.perfil_alumno?.find(p => p.tipo === 'egreso')?.descripcion ?? '',

    campos_laborales: carrera.campos_laborales
      ?.sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0))
      .map(item => item.descripcion) ?? [],

    funciones_profesionales: carrera.funciones_profesionales
      ?.sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0))
      .map(item => item.descripcion) ?? [],
  };
}

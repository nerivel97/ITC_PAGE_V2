import { ICarrera, ICarreraFormData } from '../../interfaces/oferta.interface';

export const transformFormToCreate = (formData: ICarreraFormData): any => {
  return {
    url_slug: formData.url_slug,
    title: formData.title,
    tipo: formData.tipo,
    description: formData.description,
    bg_color: formData.bg_color,
    imagen_banner: formData.imagen_banner,
    foto_mascota: formData.foto_mascota,
    foto_ingreso: formData.foto_ingreso,
    foto_egreso: formData.foto_egreso,
    campos_laborales: (formData.campos_laborales || []).map((descripcion, i) => ({
      descripcion,
      orden: i + 1
    })),
    funciones_profesionales: (formData.funciones_profesionales || []).map((descripcion, i) => ({
      descripcion,
      orden: i + 1
    })),
    mision_vision_objetivos: [
      ...(formData.misiones?.map((contenido, i) => ({
        tipo: 'mision',
        contenido,
        orden: i + 1
      })) || []),
      ...(formData.visiones?.map((contenido, i) => ({
        tipo: 'vision',
        contenido,
        orden: i + 1
      })) || []),
      ...(formData.objetivos?.map((contenido, i) => ({
        tipo: 'objetivo',
        contenido,
        orden: i + 1
      })) || [])
    ],
    perfil_alumno: [
      { tipo: 'ingreso', descripcion: formData.perfil_ingreso || '' },
      { tipo: 'egreso', descripcion: formData.perfil_egreso || '' }
    ].filter(p => p.descripcion)
  };
};

export const transformCarreraToForm = (carrera: ICarrera): ICarreraFormData => {
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
      ?.filter(m => m.tipo === 'mision')
      .map(m => m.contenido),
    visiones: carrera.mision_vision_objetivos
      ?.filter(m => m.tipo === 'vision')
      .map(m => m.contenido),
    objetivos: carrera.mision_vision_objetivos
      ?.filter(m => m.tipo === 'objetivo')
      .map(m => m.contenido),
    perfil_ingreso: carrera.perfil_alumno?.find(p => p.tipo === 'ingreso')?.descripcion,
    perfil_egreso: carrera.perfil_alumno?.find(p => p.tipo === 'egreso')?.descripcion,
    campos_laborales: carrera.campos_laborales?.map(c => c.descripcion),
    funciones_profesionales: carrera.funciones_profesionales?.map(f => f.descripcion)
  };
};
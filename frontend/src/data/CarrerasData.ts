// src/data/carrerasData.ts

export interface Carrera {
    id: number;
    title: string;
    tipo: 'licenciatura' | 'maestria' | 'doctorado';
    imagen_banner: string;
    bgColor: string;
    foto_mascota: string;
    description: string;
    objetivos: string;
    mision: string;
    vision: string;
    perfilIngreso: string;
    foto_ingreso: string;
    perfilEgreso: string;
    foto_egreso: string;
    campolaboral: string;
    funcionesprof: string;
    reticula: string;
  }
    
  export const carrerasData: Record<string, Carrera> = {
    // LICENCIATURAS
    "ingenieria-en-sistemas-computacionales": {
      id: 1,
      title: "Ingeniería en Sistemas Computacionales",  // Corregido: "Ingeniria" → "Ingeniería"
      tipo: "licenciatura",
      imagen_banner: "/Fotos/Carreras/headerCivil.jpg",
      bgColor: "#eb911e",
      foto_mascota: "/Fotos/Carreras/logoEstudiantesCivil.jpg",
      description: "Diseña y desarrolla soluciones tecnológicas innovadoras para resolver problemas complejos en el mundo digital.",
      objetivos: "Formar ingenieros civiles de manera integral.\nDesarrollar visión humana, analítica, creativa y emprendedora.\nResolver problemas con eficiencia, eficacia y pertinencia.",
      mision: "Ofrecer educación de calidad en ingeniería civil.\nFormar ingenieros competentes y comprometidos con el desarrollo sustentable.",
      vision: "Ser un programa educativo líder en ingeniería civil.\nReconocimiento por excelencia académica y ética profesional.",
      perfilIngreso: "Conocimientos sólidos en matemáticas y física.\nHabilidad para el razonamiento lógico y analítico.",
      foto_ingreso: "/Fotos/Carreras/ingreso.png",
      perfilEgreso: "Capacidad para diseñar y supervisar obras civiles como edificios, puentes y carreteras, con criterios de sostenibilidad.",
      foto_egreso: "/Fotos/Carreras/egreso.png",
      campolaboral: "Empresas constructoras y desarrolladoras de infraestructura.\nDependencias gubernamentales relacionadas con obras públicas.",
      funcionesprof: "Diseñar y supervisar la construcción de obras civiles.\nRealizar estudios de factibilidad y análisis de costos.",
      reticula: "Semestre 1: Fundamentos de investigación, Cálculo Diferencial\nSemestre 2: Cálculo vectorial, Geología"
    },
    // Ejemplo de cómo debería verse un objeto de carrera completo
    "ingenieria-civil": {
      id: 2,
      title: "Ingeniería Civil",  // Corregido: "Ingenieria" → "Ingeniería"
      tipo: "licenciatura",
      imagen_banner: "/Fotos/Carreras/headerCivil.jpg",
      bgColor: "#e7e154",
      foto_mascota: "/Fotos/Carreras/logoEstudiantesCivil.jpg",
      description: "Diseña y construye infraestructuras que transforman el entorno urbano y rural.",
      objetivos: "Formar ingenieros civiles de manera integral.\nDesarrollar visión humana, analítica, creativa y emprendedora.\nResolver problemas con eficiencia, eficacia y pertinencia.",
      mision: "Ofrecer educación de calidad en ingeniería civil.\nFormar ingenieros competentes y comprometidos con el desarrollo sustentable.",
      vision: "Ser un programa educativo líder en ingeniería civil.\nReconocimiento por excelencia académica y ética profesional.",
      perfilIngreso: "Conocimientos sólidos en matemáticas y física.\nHabilidad para el razonamiento lógico y analítico.",
      foto_ingreso: "/Fotos/Carreras/ingreso.png",
      perfilEgreso: "Capacidad para diseñar y supervisar obras civiles como edificios, puentes y carreteras, con criterios de sostenibilidad.",
      foto_egreso: "/Fotos/Carreras/egreso.png",
      campolaboral: "Empresas constructoras y desarrolladoras de infraestructura.\nDependencias gubernamentales relacionadas con obras públicas.",
      funcionesprof: "Diseñar y supervisar la construcción de obras civiles.\nRealizar estudios de factibilidad y análisis de costos.",
      reticula: "Semestre 1: Fundamentos de investigación, Cálculo Diferencial\nSemestre 2: Cálculo vectorial, Geología"
    },
    "licenciatura-en-administracion": {
      id: 3,
      title: "Licenciatura en Administración",  // Corregido: "Administracion" → "Administración"
      tipo: "licenciatura",
      imagen_banner: "/Fotos/Carreras/headerCivil.jpg",
      description: `Desarrolla habilidades estratégicas y operativas para liderar organizaciones con eficiencia y visión.`,
      bgColor: "#d48ce9",
      foto_mascota: "/Fotos/Carreras/logoEstudiantesCivil.jpg",
      objetivos: "Formar ingenieros civiles de manera integral.\nDesarrollar visión humana, analítica, creativa y emprendedora.\nResolver problemas con eficiencia, eficacia y pertinencia.",
      mision: "Ofrecer educación de calidad en ingeniería civil.\nFormar ingenieros competentes y comprometidos con el desarrollo sustentable.",
      vision: "Ser un programa educativo líder en ingeniería civil.\nReconocimiento por excelencia académica y ética profesional.",
      perfilIngreso: "Conocimientos sólidos en matemáticas y física.\nHabilidad para el razonamiento lógico y analítico.",
      foto_ingreso: "/Fotos/Carreras/ingreso.png",
      perfilEgreso: "Capacidad para diseñar y supervisar obras civiles como edificios, puentes y carreteras, con criterios de sostenibilidad.",
      foto_egreso: "/Fotos/Carreras/egreso.png",
      campolaboral: "Empresas constructoras y desarrolladoras de infraestructura.\nDependencias gubernamentales relacionadas con obras públicas.",
      funcionesprof: "Diseñar y supervisar la construcción de obras civiles.\nRealizar estudios de factibilidad y análisis de costos.",
      reticula: "Semestre 1: Fundamentos de investigación, Cálculo Diferencial\nSemestre 2: Cálculo vectorial, Geología"
    },
    "contador-publico": {
      id: 4,
      title: "Contador Público",  // Corregido: "Publico" → "Público"
      tipo: "licenciatura",
      imagen_banner: "/Fotos/Carreras/headerCivil.jpg",
      description: `Esta carrera te prepara para ser el profesional que las empresas necesitan para gestionar sus finanzas, impuestos y auditorías con ética y precisión.`,
      bgColor: "#ff9bd9",
      foto_mascota: "/Fotos/Carreras/logoEstudiantesCivil.jpg",
      objetivos: "Formar ingenieros civiles de manera integral.\nDesarrollar visión humana, analítica, creativa y emprendedora.\nResolver problemas con eficiencia, eficacia y pertinencia.",
      mision: "Ofrecer educación de calidad en ingeniería civil.\nFormar ingenieros competentes y comprometidos con el desarrollo sustentable.",
      vision: "Ser un programa educativo líder en ingeniería civil.\nReconocimiento por excelencia académica y ética profesional.",
      perfilIngreso: "Conocimientos sólidos en matemáticas y física.\nHabilidad para el razonamiento lógico y analítico.",
      foto_ingreso: "/Fotos/Carreras/ingreso.png",
      perfilEgreso: "Capacidad para diseñar y supervisar obras civiles como edificios, puentes y carreteras, con criterios de sostenibilidad.",
      foto_egreso: "/Fotos/Carreras/egreso.png",
      campolaboral: "Empresas constructoras y desarrolladoras de infraestructura.\nDependencias gubernamentales relacionadas con obras públicas.",
      funcionesprof: "Diseñar y supervisar la construcción de obras civiles.\nRealizar estudios de factibilidad y análisis de costos.",
      reticula: "Semestre 1: Fundamentos de investigación, Cálculo Diferencial\nSemestre 2: Cálculo vectorial, Geología"
    },
    "ingenieria-en-administracion": {
      id: 5,
      title: "Ingeniería en Administración",  // Corregido: "Ingenieria" → "Ingeniería", "Administracion" → "Administración"
      tipo: "licenciatura",
      imagen_banner: "/Fotos/Carreras/headerCivil.jpg",
      description: `Combinación de ingeniería y gestión para optimizar procesos organizacionales.`,
      bgColor: "#309cff",
      foto_mascota: "/Fotos/Carreras/logoEstudiantesCivil.jpg",
      objetivos: "Formar ingenieros civiles de manera integral.\nDesarrollar visión humana, analítica, creativa y emprendedora.\nResolver problemas con eficiencia, eficacia y pertinencia.",
      mision: "Ofrecer educación de calidad en ingeniería civil.\nFormar ingenieros competentes y comprometidos con el desarrollo sustentable.",
      vision: "Ser un programa educativo líder en ingeniería civil.\nReconocimiento por excelencia académica y ética profesional.",
      perfilIngreso: "Conocimientos sólidos en matemáticas y física.\nHabilidad para el razonamiento lógico y analítico.",
      foto_ingreso: "/Fotos/Carreras/ingreso.png",
      perfilEgreso: "Capacidad para diseñar y supervisar obras civiles como edificios, puentes y carreteras, con criterios de sostenibilidad.",
      foto_egreso: "/Fotos/Carreras/egreso.png",
      campolaboral: "Empresas constructoras y desarrolladoras de infraestructura.\nDependencias gubernamentales relacionadas con obras públicas.",
      funcionesprof: "Diseñar y supervisar la construcción de obras civiles.\nRealizar estudios de factibilidad y análisis de costos.",
      reticula: "Semestre 1: Fundamentos de investigación, Cálculo Diferencial\nSemestre 2: Cálculo vectorial, Geología"
    },
    "ingenieria-en-gestion-empresarial": {
      id: 6,
      title: "Ingeniería en Gestión Empresarial",  // Corregido: "Ingenieria" → "Ingeniería", "Gestion" → "Gestión"
      tipo: "licenciatura",
      imagen_banner: "/Fotos/Carreras/headerCivil.jpg",
      description: `Adquiere competencias para dirigir proyectos y equipos, impulsando el crecimiento empresarial.`,
      bgColor: "#61de52",
      foto_mascota: "/Fotos/Carreras/logoEstudiantesCivil.jpg",
      objetivos: "Formar ingenieros civiles de manera integral.\nDesarrollar visión humana, analítica, creativa y emprendedora.\nResolver problemas con eficiencia, eficacia y pertinencia.",
      mision: "Ofrecer educación de calidad en ingeniería civil.\nFormar ingenieros competentes y comprometidos con el desarrollo sustentable.",
      vision: "Ser un programa educativo líder en ingeniería civil.\nReconocimiento por excelencia académica y ética profesional.",
      perfilIngreso: "Conocimientos sólidos en matemáticas y física.\nHabilidad para el razonamiento lógico y analítico.",
      foto_ingreso: "/Fotos/Carreras/ingreso.png",
      perfilEgreso: "Capacidad para diseñar y supervisar obras civiles como edificios, puentes y carreteras, con criterios de sostenibilidad.",
      foto_egreso: "/Fotos/Carreras/egreso.png",
      campolaboral: "Empresas constructoras y desarrolladoras de infraestructura.\nDependencias gubernamentales relacionadas con obras públicas.",
      funcionesprof: "Diseñar y supervisar la construcción de obras civiles.\nRealizar estudios de factibilidad y análisis de costos.",
      reticula: "Semestre 1: Fundamentos de investigación, Cálculo Diferencial\nSemestre 2: Cálculo vectorial, Geología"
    },
    "ingenieria-mecatronica": {
      id: 7,
      title: "Ingeniería Mecatrónica",  // Corregido: "Ingenieria" → "Ingeniería", "Mecatronica" → "Mecatrónica"
      tipo: "licenciatura",
      imagen_banner: "/Fotos/Carreras/headerCivil.jpg",
      description: `Integra mecánica, electrónica y computación para desarrollar sistemas automatizados y robots inteligentes.`,
      bgColor: "#a7a7a7",
      foto_mascota: "/Fotos/Carreras/logoEstudiantesCivil.jpg",
      objetivos: "Formar ingenieros civiles de manera integral.\nDesarrollar visión humana, analítica, creativa y emprendedora.\nResolver problemas con eficiencia, eficacia y pertinencia.",
      mision: "Ofrecer educación de calidad en ingeniería civil.\nFormar ingenieros competentes y comprometidos con el desarrollo sustentable.",
      vision: "Ser un programa educativo líder en ingeniería civil.\nReconocimiento por excelencia académica y ética profesional.",
      perfilIngreso: "Conocimientos sólidos en matemáticas y física.\nHabilidad para el razonamiento lógico y analítico.",
      foto_ingreso: "/Fotos/Carreras/ingreso.png",
      perfilEgreso: "Capacidad para diseñar y supervisar obras civiles como edificios, puentes y carreteras, con criterios de sostenibilidad.",
      foto_egreso: "/Fotos/Carreras/egreso.png",
      campolaboral: "Empresas constructoras y desarrolladoras de infraestructura.\nDependencias gubernamentales relacionadas con obras públicas.",
      funcionesprof: "Diseñar y supervisar la construcción de obras civiles.\nRealizar estudios de factibilidad y análisis de costos.",
      reticula: "Semestre 1: Fundamentos de investigación, Cálculo Diferencial\nSemestre 2: Cálculo vectorial, Geología"
    },
    "ingenieria-electromecanica": {
      id: 8,
      title: "Ingeniería Electromecánica",  // Corregido: "Ingenieria" → "Ingeniería", "Electromecanica" → "Electromecánica"
      tipo: "licenciatura",
      imagen_banner: "/Fotos/Carreras/headerCivil.jpg",
      description: `Combina conocimientos de electricidad y mecánica para mantener y optimizar equipos industriales.`,
      bgColor: "#ff3030",
      foto_mascota: "/Fotos/Carreras/logoEstudiantesCivil.jpg",
      objetivos: "Formar ingenieros civiles de manera integral.\nDesarrollar visión humana, analítica, creativa y emprendedora.\nResolver problemas con eficiencia, eficacia y pertinencia.",
      mision: "Ofrecer educación de calidad en ingeniería civil.\nFormar ingenieros competentes y comprometidos con el desarrollo sustentable.",
      vision: "Ser un programa educativo líder en ingeniería civil.\nReconocimiento por excelencia académica y ética profesional.",
      perfilIngreso: "Conocimientos sólidos en matemáticas y física.\nHabilidad para el razonamiento lógico y analítico.",
      foto_ingreso: "/Fotos/Carreras/ingreso.png",
      perfilEgreso: "Capacidad para diseñar y supervisar obras civiles como edificios, puentes y carreteras, con criterios de sostenibilidad.",
      foto_egreso: "/Fotos/Carreras/egreso.png",
      campolaboral: "Empresas constructoras y desarrolladoras de infraestructura.\nDependencias gubernamentales relacionadas con obras públicas.",
      funcionesprof: "Diseñar y supervisar la construcción de obras civiles.\nRealizar estudios de factibilidad y análisis de costos.",
      reticula: "Semestre 1: Fundamentos de investigación, Cálculo Diferencial\nSemestre 2: Cálculo vectorial, Geología"
    },
  
    // MAESTRÍAS
    "maestria-en-ciencias-ambientales": {
      id: 9,
      title: "Maestría en Ciencias Ambientales",  // Corregido: "Maestria" → "Maestría"
      tipo: "maestria",
      imagen_banner: "/Fotos/Carreras/headerCivil.jpg",
      description: "Estudia los procesos ecológicos y desarrolla soluciones para la conservación del medio ambiente.",
      bgColor: "#06bd00",
      foto_mascota: "/Fotos/Carreras/logoEstudiantesCivil.jpg",
      objetivos: "Formar ingenieros civiles de manera integral.\nDesarrollar visión humana, analítica, creativa y emprendedora.\nResolver problemas con eficiencia, eficacia y pertinencia.",
      mision: "Ofrecer educación de calidad en ingeniería civil.\nFormar ingenieros competentes y comprometidos con el desarrollo sustentable.",
      vision: "Ser un programa educativo líder en ingeniería civil.\nReconocimiento por excelencia académica y ética profesional.",
      perfilIngreso: "Conocimientos sólidos en matemáticas y física.\nHabilidad para el razonamiento lógico y analítico.",
      foto_ingreso: "/Fotos/Carreras/ingreso.png",
      perfilEgreso: "Capacidad para diseñar y supervisar obras civiles como edificios, puentes y carreteras, con criterios de sostenibilidad.",
      foto_egreso: "/Fotos/Carreras/egreso.png",
      campolaboral: "Empresas constructoras y desarrolladoras de infraestructura.\nDependencias gubernamentales relacionadas con obras públicas.",
      funcionesprof: "Diseñar y supervisar la construcción de obras civiles.\nRealizar estudios de factibilidad y análisis de costos.",
      reticula: "Semestre 1: Fundamentos de investigación, Cálculo Diferencial\nSemestre 2: Cálculo vectorial, Geología"
    },
    "maestria-en-administracion-de-negocios": {
      id: 10,
      title: "Maestría en Administración de Negocios",  // Corregido: "Maestria" → "Maestría", "Administracion" → "Administración"
      tipo: "maestria",
      imagen_banner: "/Fotos/Carreras/headerCivil.jpg",
      description: "Fortalece tus habilidades directivas y estratégicas para liderar en el mundo empresarial.",
      bgColor: "#0780ea",
      foto_mascota: "/Fotos/Carreras/logoEstudiantesCivil.jpg",
      objetivos: "Formar ingenieros civiles de manera integral.\nDesarrollar visión humana, analítica, creativa y emprendedora.\nResolver problemas con eficiencia, eficacia y pertinencia.",
      mision: "Ofrecer educación de calidad en ingeniería civil.\nFormar ingenieros competentes y comprometidos con el desarrollo sustentable.",
      vision: "Ser un programa educativo líder en ingeniería civil.\nReconocimiento por excelencia académica y ética profesional.",
      perfilIngreso: "Conocimientos sólidos en matemáticas y física.\nHabilidad para el razonamiento lógico y analítico.",
      foto_ingreso: "/Fotos/Carreras/ingreso.png",
      perfilEgreso: "Capacidad para diseñar y supervisar obras civiles como edificios, puentes y carreteras, con criterios de sostenibilidad.",
      foto_egreso: "/Fotos/Carreras/egreso.png",
      campolaboral: "Empresas constructoras y desarrolladoras de infraestructura.\nDependencias gubernamentales relacionadas con obras públicas.",
      funcionesprof: "Diseñar y supervisar la construcción de obras civiles.\nRealizar estudios de factibilidad y análisis de costos.",
      reticula: "Semestre 1: Fundamentos de investigación, Cálculo Diferencial\nSemestre 2: Cálculo vectorial, Geología"
    },
  
    // DOCTORADO
    "doctorado-en-ciencias-ambientales": {
      id: 11,
      title: "Doctorado en Ciencias Ambientales",  // (Este estaba correcto)
      tipo: "doctorado",
      imagen_banner: "/Fotos/Carreras/headerCivil.jpg",
      description: "Contribuye al conocimiento y solución de problemas ambientales a través de la investigación científica.",
      bgColor: "#06bd00",
      foto_mascota: "/Fotos/Carreras/logoEstudiantesCivil.jpg",
      objetivos: "Formar ingenieros civiles de manera integral.\nDesarrollar visión humana, analítica, creativa y emprendedora.\nResolver problemas con eficiencia, eficacia y pertinencia.",
      mision: "Ofrecer educación de calidad en ingeniería civil.\nFormar ingenieros competentes y comprometidos con el desarrollo sustentable.",
      vision: "Ser un programa educativo líder en ingeniería civil.\nReconocimiento por excelencia académica y ética profesional.",
      perfilIngreso: "Conocimientos sólidos en matemáticas y física.\nHabilidad para el razonamiento lógico y analítico.",
      foto_ingreso: "/Fotos/Carreras/ingreso.png",
      perfilEgreso: "Capacidad para diseñar y supervisar obras civiles como edificios, puentes y carreteras, con criterios de sostenibilidad.",
      foto_egreso: "/Fotos/Carreras/egreso.png",
      campolaboral: "Empresas constructoras y desarrolladoras de infraestructura.\nDependencias gubernamentales relacionadas con obras públicas.",
      funcionesprof: "Diseñar y supervisar la construcción de obras civiles.\nRealizar estudios de factibilidad y análisis de costos.",
      reticula: "Semestre 1: Fundamentos de investigación, Cálculo Diferencial\nSemestre 2: Cálculo vectorial, Geología"
    }
  };
  
  // Exportar listas organizadas por tipo
  export const licenciaturas = Object.entries(carrerasData)
    .filter(([_, data]) => data.tipo === 'licenciatura')
    .map(([id, data]) => ({ ...data, urlId: id }));
  
  export const maestrias = Object.entries(carrerasData)
    .filter(([_, data]) => data.tipo === 'maestria')
    .map(([id, data]) => ({ ...data, urlId: id }));
  
  export const doctorados = Object.entries(carrerasData)
    .filter(([_, data]) => data.tipo === 'doctorado')
    .map(([id, data]) => ({ ...data, urlId: id }));
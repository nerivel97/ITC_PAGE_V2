//import React from 'react';

export interface DirectorioItem {
  cargo: string;
  nombre: string;
  correo: string;
  extension?: string;
}

export interface SeccionDirectorio {
  titulo: string;
  datos: DirectorioItem[];
}

export const secciones: SeccionDirectorio[] = [
  {
    titulo: 'Dirección',
    datos: [
      {
        cargo: 'Director',
        nombre: 'Dr. Carlos Tiburcio Martínez Martínez',
        correo: 'dir_cancun@tecnm.mx',
        extension: '2000'
      },
      {
        cargo: 'Asistente de dirección',
        nombre: 'Lic. Mercy Rossana Martínez Torres',
        correo: 'dir01@cancun.tecnm.mx',
        extension: '2000'
      }
    ]
  },
  {
    titulo: 'Dirección académica',
    datos: [
      {
        cargo: 'Subdirector Académico',
        nombre: 'Diego Briceño-Domínguez',
        correo: 'acad@cancun.tecnm.mx',
        extension: '2039'
      },
      {
        cargo: 'Depto. de Ciencias Básicas',
        nombre: 'Ing. Luis Arcadio Sánchez Quijano',
        correo: 'cbas@cancun.tecnm.mx',
        extension: '2048'
      },
      {
        cargo: 'Depto. de Sistemas y Computación',
        nombre: 'MTRO. Ismael Agustin Silva Dzib',
        correo: 'sistemas@cancun.tecnm.mx',
        extension: '2038'
      },
      {
        cargo: 'Depto. de Ingenierías',
        nombre: 'Dr. Gustavo Pérez Hernández',
        correo: 'ing@cancun.tecnm.mx',
        extension: '2023'
      },
      {
        cargo: 'Depto. de Ciencias Económico-Administrativas',
        nombre: 'Lic. José Román Bracamonte Pacheco',
        correo: 'cead@cancun.tecnm.mx',
        extension: '2011'
      },
      {
        cargo: 'Depto. de Desarrollo Académico',
        nombre: 'MDF. Santiago de Jesús Rejón Delgado',
        correo: 'dda@cancun.tecnm.mx',
        extension: '2044'
      },
      {
        cargo: 'División de Estudios Profesionales',
        nombre: 'Mtra. Viviana Nashely Andrade Armenta',
        correo: 'dep@cancun.tecnm.mx',
        extension: '2041'
      },
      {
        cargo: 'División de Estudios de Posgrado e Investigación',
        nombre: 'Mtro. Alex Ramos Santiago',
        correo: 'depi@cancun.tecnm.mx',
        extension: '2018'
      }
    ]
  },
  {
    titulo: 'Dirección administrativa',
    datos: [
      {
        cargo: 'Subdirectora de Servicios Administrativos',
        nombre: 'Lic. Guillermina Peña Padilla',
        correo: 'admon@cancun.tecnm.mx',
        extension: '2040'
      },
      {
        cargo: 'Depto. de Recursos Humanos',
        nombre: 'Arq. Aydee Arely García Elías',
        correo: 'rh@cancun.tecnmx.mx',
        extension: '2046'
      },
      {
        cargo: 'Depto. de Recursos Financieros',
        nombre: 'Mtra. Yusely Margarita Romero Urbina',
        correo: 'rf@cancun.tecnm.mx',
        extension: '2045'
      },
      {
        cargo: 'Depto. de Recursos Materiales y Servicios',
        nombre: 'M.C.E Jesús Jomeni Balan Mendoza',
        correo: 'rm@cancun.tecnm.mx',
        extension: '2035'
      },
      {
        cargo: 'Centro de Cómputo',
        nombre: 'Mtro. Luis Aron Chulin Bacab',
        correo: 'cc@cancun.tecnm.mx',
        extension: '2042'
      },
      {
        cargo: 'Depto. de Mantenimiento de Equipo',
        nombre: 'Ing. Miguel Ángel Basto Pech',
        correo: 'manto@cancun.tecnm.mx',
        extension: '2036'
      }
    ]
  },
  {
    titulo: 'Planeación y Vinculación',
    datos: [
      {
        cargo: 'Subdirectora de Planeación y Vinculación',
        nombre: 'Dra. Claudia Ivette Arriola Escalante',
        correo: 'plan@cancun.tecnm.mx',
        extension: '2047'
      },
      {
        cargo: 'Depto. de Planeación, Programación y Presupuestación',
        nombre: 'Ing. Pedro Jesús Novelo Moguel',
        correo: 'pl@cancun.tecnm.mx',
        extension: '2003'
      },
      {
        cargo: 'Depto. de Gestión Tecnológica y Vinculación',
        nombre: 'ING. Javier Pacheco Hipólito',
        correo: 'vin@cancun.tecnm.mx',
        extension: '2043'
      },
      {
        cargo: 'Depto. de Comunicación y Difusión',
        nombre: 'Lic. Carlos Herbert Marrufo Solís',
        correo: 'cyd@cancun.tecnm.mx',
        extension: '2017'
      },
      {
        cargo: 'Depto. de Servicios Escolares',
        nombre: 'Ing. Dianela Shanderine García Herrera',
        correo: 'se@cancun.tecnm.mx',
        extension: '2013'
      },
      {
        cargo: 'Depto. de Actividades Extraescolares',
        nombre: 'Lic. Alejandro Flores Reyes',
        correo: 'ext@cancun.tecnm.mx',
        extension: '2021'
      },
      
    ]
  },
  {
    titulo: 'Centro de información y lenguas extrangeras',
    datos: [
      {
        cargo: 'Centro de Información',
        nombre: 'Centro de Información',
        correo: 'ci@cancun.tecnm.mx',
        extension: '2030'
      },
      {
        cargo: 'Centro de Lenguas Extranjeras',
        nombre: 'Centro de Lenguas Extranjeras',
        correo: 'cle@cancun.tecnm.mx',
        extension: 'Whatsapp (998) 344 9979'
      }
    ]
  }
];

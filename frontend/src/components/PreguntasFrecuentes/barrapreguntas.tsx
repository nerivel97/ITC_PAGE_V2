import { useState } from "react";
import styles from "./barrapreguntas.module.css";

const preguntas = [
  {
    pregunta:
      "¿Hay carreras en modalidad mixta (presencial y en línea) o horarios flexibles?",
    respuesta:
      "Solo se manejan dos modalidades, 1. presencial, el horario uno lo puede acomodar a partir de 2do y en línea....",
  },
  {
    pregunta: "¿Cuántos semestres son por cada carrera?",
    respuesta: "Son 9 semestres y puede llegar uno hasta 12 semestres.",
  },
  {
    pregunta:
      "¿Qué pasa si, llegué al límite de semestre y me faltan materias?",
    respuesta:
      "Si te llega a faltar materias o algún servicio (s.s o residencia), debes pedir prórroga y para más información comunicarse con el área de división de estudios.",
  },
  {
    pregunta: "¿Qué necesito para titularme?",
    respuesta:
      "Haber cumplido todas tus materias, haber hecho tu servicio social, la residencia y el inglés.",
  },
  {
    pregunta: "¿Qué requisitos para hacer mi residencia?",
    respuesta:
      "Como primer punto, haber liberado tu S.S., no tener ninguna materia reprobada y tener 80% en el kardex.",
  },
  {
    pregunta: "¿Qué requisitos necesito para hacer mi servicio social?",
    respuesta: "Tener 70% de tu kardex y tener los 5 créditos complementarios.",
  },
  {
    pregunta: "¿Qué pasa si llego a reprobar una materia?",
    respuesta:
      "Si llegas a reprobar alguna materia, tienes una oportunidad que se llama 'repite'. Si repruebas de nuevo, entras en modo especial y si vuelves a reprobar, es baja total.",
  },
  {
    pregunta: "¿Cuáles son los pasos para abrir un verano?",
    respuesta:
      "Necesitas reunir al menos 15 personas para armar grupo, empezar con el trámite y en la fecha establecida se envían los documentos. Cada curso tiene un costo dependiendo de cuántas horas dure y solo es un pago.",
  },
  {
    pregunta: "¿Cuánto es el monto a pagar por cada semestre?",
    respuesta: "Es un aproximado de $2800 por cada semestre.",
  },
  {
    pregunta: "¿Qué son los créditos complementarios?",
    respuesta:
      "Son actividades extracurriculares o culturales (como danza, basket, Inovatec), que por participar en las fechas correspondientes, se te otorga un crédito complementario.",
  },
  {
    pregunta: "¿Cuánto es el mínimo para tener tu inglés?",
    respuesta: "El nivel para tener tu inglés liberado es de Intermedio 2.",
  },
  {
    pregunta: "¿Cómo son los cursos de inglés?",
    respuesta:
      "Cuentan con dos modalidades (presenciales y virtuales), estos dependen de si se abre grupo. El monto es de aproximadamente $800, incluye libro y curso. No afectan tu kardex ya que son aparte.",
  },
  {
    pregunta: "¿Qué es el SIE y cómo puedo acceder?",
    respuesta:
      "El SIE es donde puedes consultar tu horario, kardex, reinscripción, residencia, entre otros. Para acceder necesitas tu número de control, que está en tu credencial.",
  },
  {
    pregunta: "¿Qué pasa si pierdo mi credencial?",
    respuesta:
      "Necesitas bajar el voucher desde el SIE (en servicios de pago, seleccionas tarjeta), haces el pago y llevas el comprobante a servicios escolares, ubicado en el primer edificio, a la izquierda al entrar.",
  },
];

const Barrapreguntas = () => {
  const [activo, setActivo] = useState<number | null>(0);

  const alternar = (index: number) => {
    setActivo(index === activo ? null : index);
  };

  return (
    <div className={styles["contenedor-acordeon"]}>
      {preguntas.map((item, index) => (
        <div key={index} className={styles["item-acordeon"]}>
          <button
            className={styles["boton-pregunta"]}
            onClick={() => alternar(index)}
          >
            {item.pregunta}
            <span className={styles.icono}>{activo === index ? "▲" : "▼"}</span>
          </button>
          {activo === index && item.respuesta && (
            <div className={styles.respuesta}>{item.respuesta}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Barrapreguntas;

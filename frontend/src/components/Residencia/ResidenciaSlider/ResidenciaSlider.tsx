import styles from './ResidenciaSlider.module.css';

export interface ResidenciaSliderImage {
  url: string;
  title: string;
  alt: string;
}

interface ResidenciaSliderProps {
  images: ResidenciaSliderImage[];
}

export function ResidenciaSlider({ images }: ResidenciaSliderProps) {
  return (
    <div className={styles.slider}>
      <div className={styles.slider__track}>
        {images.map((image, index) => (
          <img
            key={index}
            className={styles.slider__image}
            src={image.url}
            alt={image.alt}
            title={image.title}
          />
        ))}
      </div>
      <div className={styles.slider__track}>
        {images.map((image, index) => (
          <img
            key={index}
            className={styles.slider__image}
            src={image.url}
            alt={image.alt}
            title={image.title}
          />
        ))}
      </div>
    </div>
  );
}

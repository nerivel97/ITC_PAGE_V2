export interface IImage {
    id: number;
    image: string;
    alt: string;
}

export interface ISeccion {
    titulo: string;
    descripcion?: string;
    botonTexto?: string;
    imagenUrl?: string;
}

export interface ICard {
    image: string;
    title: string;
    link: string;
}

export interface IHomeData {
    carouselImages: IImage[];
    quienesSomos: ISeccion;
    vidaEstudiantil: ISeccion;
    cardsDesarrollo: ICard[];
    secciones: {
        noticias: ISeccion;
        eventos: ISeccion;
    };
}

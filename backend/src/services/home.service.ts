import { IHomeData } from '../interfaces/home.interface';

export class HomeService {
    static getHomeData(): IHomeData {
        return {
            carouselImages: [
                { id: 1, image: 'carouselImage1.jpg', alt: 'Slide 1' },
                { id: 2, image: 'carouselImage2.jpg', alt: 'Slide 2' },
                { id: 3, image: 'carouselImage3.jpg', alt: 'Slide 3' },
            ],
            quienesSomos: {
                titulo: 'Quiénes Somos',
                descripcion: 'Texto descriptivo...',
                botonTexto: 'Saber más...',
                imagenUrl: 'https://url.com/imagen.jpg',
            },
            vidaEstudiantil: {
                titulo: 'Vida estudiantil',
                descripcion: 'Texto sobre vida estudiantil...',
                botonTexto: 'Saber más...',
                imagenUrl: 'https://url.com/vida.jpg',
            },
            cardsDesarrollo: [
                {
                    image: 'https://img1.jpg',
                    title: 'Calentamiento global',
                    link: 'https://link1.com',
                },
                {
                    image: 'https://img2.jpg',
                    title: 'Termodinámica',
                    link: 'https://link2.com',
                },
                {
                    image: 'https://img3.jpg',
                    title: 'Aerodinámica',
                    link: 'https://link3.com',
                },
            ],
            secciones: {
                noticias: {
                    titulo: 'Noticias',
                },
                eventos: {
                    titulo: 'Eventos',
                },
            },
        };
    }
}

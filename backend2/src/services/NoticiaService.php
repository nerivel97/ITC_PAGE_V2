<?php
require_once './models/Noticia.php';

class NoticiaService {
    public function getAllNoticias() {
        // Simulación: reemplazar por consulta a base de datos usado
        return [
            new Noticia(1, "Título 1", "Descripción 1", "2025-05-19", "Autor 1"),
            new Noticia(2, "Título 2", "Descripción 2", "2025-05-20", "Autor 2")
        ];
    }

    public function getNoticiaById($id) {
        foreach ($this->getAllNoticias() as $noticia) {
            if ($noticia->id == $id) {
                return $noticia;
            }
        }
        return null;
    }

    public function createNoticia($data) {
        // Aquí iría la lógica para insertar en la base de datos
        return new Noticia(rand(100, 999), $data['nombre_noticia'], $data['descripcion'], $data['fecha_publicacion'], $data['autor']);
    }

    public function updateNoticia($id, $data) {
        // Aquí iría la lógica para actualizar en la base de datos
        return new Noticia($id, $data['nombre_noticia'], $data['descripcion'], $data['fecha_publicacion'], $data['autor']);
    }

    public function deleteNoticia($id) {
        // Simular eliminación
        return true;
    }
}

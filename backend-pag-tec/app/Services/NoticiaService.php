<?php
namespace App\Services;

use App\Models\Noticia;
use PDO;
use PDOException;

class NoticiaService {
    private $db;

    public function __construct(PDO $db) {
        $this->db = $db;
    }

    // CREATE
    public function createNoticia(Noticia $noticia) {
    try {
        $sql = "INSERT INTO noticias (
            nombre_noticia, descripcion, fecha_publicacion, 
            autor, imagen
        ) VALUES (:nombre, :descripcion, :fecha, :autor, :imagen)";

        $stmt = $this->db->prepare($sql);
        
        $stmt->bindParam(':nombre', $noticia->nombre_noticia, PDO::PARAM_STR);
        $stmt->bindParam(':descripcion', $noticia->descripcion, PDO::PARAM_STR);
        $stmt->bindParam(':fecha', $noticia->fecha_publicacion, PDO::PARAM_STR);
        $stmt->bindParam(':autor', $noticia->autor, PDO::PARAM_STR);
        $stmt->bindParam(':imagen', $noticia->imagen, PDO::PARAM_STR);
        
        if (!$stmt->execute()) {
            $errorInfo = $stmt->errorInfo();
            throw new \Exception("Error al ejecutar consulta: " . $errorInfo[2]);
        }

        return $this->getNoticiaById($this->db->lastInsertId());

    } catch (PDOException $e) {
        error_log("Error PDO: " . $e->getMessage());
        throw new \Exception("Error de base de datos: " . $e->getMessage());
    }
}

    // READ
    public function getAllNoticias() {
        try {
            $stmt = $this->db->query("
                SELECT * FROM noticias 
                ORDER BY fecha_publicacion DESC
            ");
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new \Exception("Error al obtener noticias: " . $e->getMessage());
        }
    }

    public function getNoticiaById($id) {
        try {
            $stmt = $this->db->prepare("SELECT * FROM noticias WHERE id_noticia = ?");
            $stmt->execute([$id]);
            $noticiaData = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$noticiaData) return null;

            $noticia = new Noticia();
            foreach ($noticiaData as $key => $value) {
                $noticia->$key = $value;
            }

            return $noticia;
        } catch (PDOException $e) {
            throw new \Exception("Error al obtener noticia: " . $e->getMessage());
        }
    }

    // UPDATE
    public function updateNoticia($id, Noticia $noticia) {
    try {
        // Construir la consulta dinámicamente basada en los campos proporcionados
        $updates = [];
        $params = [];
        
        if (!empty($noticia->nombre_noticia)) {
            $updates[] = "nombre_noticia = ?";
            $params[] = $noticia->nombre_noticia;
        }
        
        if (!empty($noticia->descripcion)) {
            $updates[] = "descripcion = ?";
            $params[] = $noticia->descripcion;
        }
        
        if (!empty($noticia->fecha_publicacion)) {
            $updates[] = "fecha_publicacion = ?";
            $params[] = $noticia->fecha_publicacion;
        }
        
        if (!empty($noticia->autor)) {
            $updates[] = "autor = ?";
            $params[] = $noticia->autor;
        }
        
        if (isset($noticia->imagen)) {
            $updates[] = "imagen = ?";
            $params[] = $noticia->imagen;
        }
        
        if (empty($updates)) {
            throw new \Exception("No se proporcionaron datos para actualizar");
        }
        
        $params[] = $id;
        
        $sql = "UPDATE noticias SET " . implode(', ', $updates) . " WHERE id_noticia = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);

        return $this->getNoticiaById($id);
    } catch (PDOException $e) {
        error_log('Error en updateNoticia: ' . $e->getMessage());
        throw new \Exception("Error al actualizar noticia: " . $e->getMessage());
    }
}
    // DELETE
    public function deleteNoticia($id) {
        try {
            $stmt = $this->db->prepare("DELETE FROM noticias WHERE id_noticia = ?");
            $stmt->execute([$id]);

            if ($stmt->rowCount() === 0) {
                throw new \Exception("Noticia no encontrada");
            }
        } catch (PDOException $e) {
            throw new \Exception("Error al eliminar noticia: " . $e->getMessage());
        }
    }

    // SEARCH
    public function searchNoticias($query) {
        try {
            $stmt = $this->db->prepare("
                SELECT * FROM noticias 
                WHERE nombre_noticia LIKE ? OR descripcion LIKE ?
                ORDER BY fecha_publicacion DESC
            ");
            $searchTerm = "%$query%";
            $stmt->execute([$searchTerm, $searchTerm]);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new \Exception("Error al buscar noticias: " . $e->getMessage());
        }
    }
}
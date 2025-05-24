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
            $stmt = $this->db->prepare("
                INSERT INTO noticias (
                    nombre_noticia, descripcion, fecha_publicacion, 
                    autor, imagen
                ) VALUES (?, ?, ?, ?, ?)
            ");
            
            $stmt->execute([
                $noticia->nombre_noticia,
                $noticia->descripcion,
                $noticia->fecha_publicacion,
                $noticia->autor,
                $noticia->imagen
            ]);

            $noticiaId = $this->db->lastInsertId();
            return $this->getNoticiaById($noticiaId);
        } catch (PDOException $e) {
            throw new \Exception("Error al crear noticia: " . $e->getMessage());
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
            $stmt = $this->db->prepare("
                UPDATE noticias SET
                    nombre_noticia = ?,
                    descripcion = ?,
                    fecha_publicacion = ?,
                    autor = ?,
                    imagen = ?
                WHERE id_noticia = ?
            ");
            
            $stmt->execute([
                $noticia->nombre_noticia,
                $noticia->descripcion,
                $noticia->fecha_publicacion,
                $noticia->autor,
                $noticia->imagen,
                $id
            ]);

            return $this->getNoticiaById($id);
        } catch (PDOException $e) {
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
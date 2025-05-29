<?php
namespace App\Services;

use App\Models\Noticias;
use PDO;
use PDOException;

class NoticiaService {
    private $db;

    public function __construct(PDO $db) {
        $this->db = $db;
    }

    public function createNoticia(Noticias $noticia) {
        try {
            $stmt = $this->db->prepare("
                INSERT INTO noticias (
                    nombre_noticia, descripcion, 
                    fecha_publicacion, autor, imagen
                ) VALUES (?, ?, ?, ?, ?)
            ");
            
            $stmt->execute([
                $noticia->nombre_noticia,
                $noticia->descripcion,
                $noticia->fecha_publicacion,
                $noticia->autor,
                $noticia->imagen
            ]);

            return $this->getNoticiaById($this->db->lastInsertId());
        } catch (PDOException $e) {
            throw new \Exception("Error creating news: " . $e->getMessage());
        }
    }

    public function getAllNoticias() {
        try {
            $stmt = $this->db->query("SELECT * FROM noticias ORDER BY fecha_publicacion DESC");
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log($e->getMessage());
            throw new \Exception("Error fetching news: " . $e->getMessage());
        }
    }

    public function getNoticiaById($id) {
        try {
            $stmt = $this->db->prepare("SELECT * FROM noticias WHERE id_noticia = ?");
            $stmt->execute([$id]);
            $noticiaData = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$noticiaData) return null;

            $noticia = new Noticias();
            foreach ($noticiaData as $key => $value) {
                $noticia->$key = $value;
            }

            return $noticia;
        } catch (PDOException $e) {
            throw new \Exception("Error fetching news: " . $e->getMessage());
        }
    }

    public function updateNoticia($id, Noticias $noticia) {
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
            throw new \Exception("Error updating news: " . $e->getMessage());
        }
    }

    public function deleteNoticia($id) {
        try {
            $stmt = $this->db->prepare("DELETE FROM noticias WHERE id_noticia = ?");
            $stmt->execute([$id]);

            if ($stmt->rowCount() === 0) {
                throw new \Exception("News not found");
            }
        } catch (PDOException $e) {
            throw new \Exception("Error deleting news: " . $e->getMessage());
        }
    }

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
            throw new \Exception("Error searching news: " . $e->getMessage());
        }
    }
}
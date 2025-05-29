<?php
require_once __DIR__ . '/../models/eventos.php';

class EventoService {
    private $db;

    public function __construct(PDO $db) {
        $this->db = $db;
    }

    public function createEvento(Evento $evento) {
        try {
            $stmt = $this->db->prepare("
                INSERT INTO eventos (
                    nombre_evento, categoria, descripcion, 
                    fecha_inicio, fecha_final, estado, imagen
                ) VALUES (?, ?, ?, ?, ?, ?, ?)
            ");
            
            $stmt->execute([
                $evento->nombre_evento,
                $evento->categoria,
                $evento->descripcion,
                $evento->fecha_inicio,
                $evento->fecha_final,
                $evento->estado,
                $evento->imagen
            ]);

            $eventoId = $this->db->lastInsertId();
            return $this->getEventoById($eventoId);
        } catch (PDOException $e) {
            throw new Exception("Error al crear evento: " . $e->getMessage());
        }
    }

    public function getAllEventos() {
        $stmt = $this->db->query("SELECT * FROM eventos ORDER BY fecha_inicio DESC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getEventoById($id) {
        $stmt = $this->db->prepare("SELECT * FROM eventos WHERE id_evento = ?");
        $stmt->execute([$id]);
        $eventoData = $stmt->fetch();

        if (!$eventoData) return null;

        $evento = new Evento();
        foreach ($eventoData as $key => $value) {
            $evento->$key = $value;
        }

        return $evento;
    }

    public function updateEvento($id, Evento $evento) {
        try {
            $stmt = $this->db->prepare("
                UPDATE eventos SET
                    nombre_evento = ?,
                    categoria = ?,
                    descripcion = ?,
                    fecha_inicio = ?,
                    fecha_final = ?,
                    estado = ?,
                    imagen = ?
                WHERE id_evento = ?
            ");
            
            $stmt->execute([
                $evento->nombre_evento,
                $evento->categoria,
                $evento->descripcion,
                $evento->fecha_inicio,
                $evento->fecha_final,
                $evento->estado,
                $evento->imagen,
                $id
            ]);

            return $this->getEventoById($id);
        } catch (PDOException $e) {
            throw new Exception("Error al actualizar evento: " . $e->getMessage());
        }
    }

    public function deleteEvento($id) {
        try {
            $stmt = $this->db->prepare("DELETE FROM eventos WHERE id_evento = ?");
            $stmt->execute([$id]);

            if ($stmt->rowCount() === 0) {
                throw new Exception("Evento no encontrado");
            }
        } catch (PDOException $e) {
            throw new Exception("Error al eliminar evento: " . $e->getMessage());
        }
    }

    public function searchEventos($query) {
        $stmt = $this->db->prepare("
            SELECT * FROM eventos 
            WHERE nombre_evento LIKE ? OR descripcion LIKE ?
            ORDER BY fecha_inicio DESC
        ");
        $searchTerm = "%$query%";
        $stmt->execute([$searchTerm, $searchTerm]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getEventosByStatus($status) {
        $stmt = $this->db->prepare("
            SELECT * FROM eventos 
            WHERE estado = ?
            ORDER BY fecha_inicio DESC
        ");
        $stmt->execute([$status]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

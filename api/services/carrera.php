<?php
// service.php

require_once __DIR__ . '/../models/carreras.php';

class CarreraService {
    private $db;

    public function __construct(PDO $db) {
        $this->db = $db;
    }

    public function createCarrera(Carrera $carrera) {
        try {
            $this->db->beginTransaction();

            $stmt = $this->db->prepare("INSERT INTO carreras (
                url_slug, title, tipo, imagen_banner, bg_color, 
                foto_mascota, description, foto_ingreso, foto_egreso
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

            $stmt->execute([
                $carrera->url_slug,
                $carrera->title,
                $carrera->tipo,
                $carrera->imagen_banner,
                $carrera->bg_color,
                $carrera->foto_mascota,
                $carrera->description,
                $carrera->foto_ingreso,
                $carrera->foto_egreso
            ]);

            $carreraId = $this->db->lastInsertId();

            $this->saveRelatedEntities($carreraId, $carrera);

            $this->db->commit();
            return $this->getCarreraById($carreraId);
        } catch (PDOException $e) {
            $this->db->rollBack();
            throw new Exception("Error al crear carrera: " . $e->getMessage());
        }
    }

    public function getAllCarreras() {
        $stmt = $this->db->query("SELECT id, url_slug, title, tipo, bg_color, description FROM carreras ORDER BY title ASC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getCarreraById($id) {
        $stmt = $this->db->prepare("SELECT * FROM carreras WHERE id = ?");
        $stmt->execute([$id]);
        $carreraData = $stmt->fetch();

        if (!$carreraData) return null;

        $carrera = new Carrera();
        foreach ($carreraData as $key => $value) {
            $carrera->$key = $value;
        }

        $carrera->campos_laborales = $this->getCamposLaborales($id);
        $carrera->funciones_profesionales = $this->getFuncionesProfesionales($id);
        $carrera->mision_vision_objetivos = $this->getMisionVisionObjetivo($id);
        $carrera->perfil_alumno = $this->getPerfilesAlumno($id);

        return $carrera;
    }

    public function getCarreraBySlug(string $slug) {
        $stmt = $this->db->prepare("SELECT * FROM carreras WHERE url_slug = ?");
        $stmt->execute([$slug]);
        $carreraData = $stmt->fetch();

        if (!$carreraData) return null;

        $carrera = new Carrera();
        foreach ($carreraData as $key => $value) {
            $carrera->$key = $value;
        }

        $id = $carrera->id;
        $carrera->campos_laborales = $this->getCamposLaborales($id);
        $carrera->funciones_profesionales = $this->getFuncionesProfesionales($id);
        $carrera->mision_vision_objetivos = $this->getMisionVisionObjetivo($id);
        $carrera->perfil_alumno = $this->getPerfilesAlumno($id);

        return $carrera;
    }


    public function updateCarrera($id, Carrera $carrera) {
        try {
            $this->db->beginTransaction();

            $stmt = $this->db->prepare("UPDATE carreras SET
                url_slug = ?, title = ?, tipo = ?, imagen_banner = ?, bg_color = ?, 
                foto_mascota = ?, description = ?, foto_ingreso = ?, foto_egreso = ?
                WHERE id = ?");

            $stmt->execute([
                $carrera->url_slug,
                $carrera->title,
                $carrera->tipo,
                $carrera->imagen_banner,
                $carrera->bg_color,
                $carrera->foto_mascota,
                $carrera->description,
                $carrera->foto_ingreso,
                $carrera->foto_egreso,
                $id
            ]);

            $this->deleteRelatedEntities($id);
            $this->saveRelatedEntities($id, $carrera);

            $this->db->commit();
            return $this->getCarreraById($id);
        } catch (PDOException $e) {
            $this->db->rollBack();
            throw new Exception("Error al actualizar carrera: " . $e->getMessage());
        }
    }

    public function deleteCarrera($id) {
        try {
            $this->db->beginTransaction();

            $this->deleteRelatedEntities($id);

            $stmt = $this->db->prepare("DELETE FROM carreras WHERE id = ?");
            $stmt->execute([$id]);

            if ($stmt->rowCount() === 0) {
                throw new Exception("Carrera no encontrada");
            }

            $this->db->commit();
        } catch (PDOException $e) {
            $this->db->rollBack();
            throw new Exception("Error al eliminar carrera: " . $e->getMessage());
        }
    }

    // Métodos auxiliares
    private function getCamposLaborales($carreraId) {
        $stmt = $this->db->prepare("SELECT * FROM campos_laborales WHERE carrera_id = ? ORDER BY orden");
        $stmt->execute([$carreraId]);
        return $stmt->fetchAll();
    }

    private function getFuncionesProfesionales($carreraId) {
        $stmt = $this->db->prepare("SELECT * FROM funciones_profesionales WHERE carrera_id = ? ORDER BY orden");
        $stmt->execute([$carreraId]);
        return $stmt->fetchAll();
    }

    private function getMisionVisionObjetivo($carreraId) {
        $stmt = $this->db->prepare("SELECT * FROM mision_vision_objetivos WHERE carrera_id = ? ORDER BY orden");
        $stmt->execute([$carreraId]);
        return $stmt->fetchAll();
    }

    private function getPerfilesAlumno($carreraId) {
        $stmt = $this->db->prepare("SELECT * FROM perfil_alumno WHERE carrera_id = ?");
        $stmt->execute([$carreraId]);
        return $stmt->fetchAll();
    }

    private function saveRelatedEntities($carreraId, Carrera $carrera) {
        if (!empty($carrera->campos_laborales)) {
            $stmt = $this->db->prepare("INSERT INTO campos_laborales (carrera_id, descripcion, orden) VALUES (?, ?, ?)");
            foreach ($carrera->campos_laborales as $campo) {
                $stmt->execute([$carreraId, $campo['descripcion'], $campo['orden'] ?? 0]);
            }
        }

        if (!empty($carrera->funciones_profesionales)) {
            $stmt = $this->db->prepare("INSERT INTO funciones_profesionales (carrera_id, descripcion, orden) VALUES (?, ?, ?)");
            foreach ($carrera->funciones_profesionales as $funcion) {
                $stmt->execute([$carreraId, $funcion['descripcion'], $funcion['orden'] ?? 0]);
            }
        }

        if (!empty($carrera->mision_vision_objetivos)) {
            $stmt = $this->db->prepare("INSERT INTO mision_vision_objetivos (carrera_id, tipo, contenido, orden) VALUES (?, ?, ?, ?)");
            foreach ($carrera->mision_vision_objetivos as $mvo) {
                $stmt->execute([$carreraId, $mvo['tipo'], $mvo['contenido'], $mvo['orden'] ?? 0]);
            }
        }

        if (!empty($carrera->perfil_alumno)) {
            $stmt = $this->db->prepare("INSERT INTO perfil_alumno (carrera_id, tipo, descripcion) VALUES (?, ?, ?)");
            foreach ($carrera->perfil_alumno as $perfil) {
                $stmt->execute([$carreraId, $perfil['tipo'], $perfil['descripcion']]);
            }
        }
    }

    private function deleteRelatedEntities($carreraId) {
        $tables = ['campos_laborales', 'funciones_profesionales', 'mision_vision_objetivos', 'perfil_alumno'];
        foreach ($tables as $table) {
            $stmt = $this->db->prepare("DELETE FROM $table WHERE carrera_id = ?");
            $stmt->execute([$carreraId]);
        }
    }
}

<?php
// app/Services/CarreraService.php

namespace App\Services;

use App\Models\Carrera;
use App\Models\CampoLaboral;
use App\Models\FuncionProfesional;
use App\Models\MisionVisionObjetivo;
use App\Models\PerfilAlumno;
use PDO;
use PDOException;

class CarreraService {
    private $db;

    public function __construct(PDO $db) {
        $this->db = $db;
    }

    // CREATE
    public function createCarrera(Carrera $carrera) {
        try {
            $this->db->beginTransaction();

            // Insertar carrera principal
            $stmt = $this->db->prepare("
                INSERT INTO carreras (
                    url_slug, title, tipo, imagen_banner, bg_color, 
                    foto_mascota, description, foto_ingreso, foto_egreso
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ");
            
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

            // Insertar relaciones si existen
            $this->saveRelatedEntities($carreraId, $carrera);

            $this->db->commit();
            return $this->getCarreraById($carreraId);
        } catch (PDOException $e) {
            $this->db->rollBack();
            throw new \Exception("Error al crear carrera: " . $e->getMessage());
        }
    }

    // READ
    public function getAllCarreras() {
        try {
            $stmt = $this->db->query("
                SELECT id, url_slug, title, tipo, bg_color, description 
                FROM carreras 
                ORDER BY title ASC
            ");
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new \Exception("Error al obtener carreras: " . $e->getMessage());
        }
    }

    public function getCarreraById($id) {
        try {
            // Obtener carrera principal
            $stmt = $this->db->prepare("SELECT * FROM carreras WHERE id = ?");
            $stmt->execute([$id]);
            $carreraData = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$carreraData) return null;

            $carrera = new Carrera();
            foreach ($carreraData as $key => $value) {
                $carrera->$key = $value;
            }

            // Obtener relaciones
            $carrera->campos_laborales = $this->getCamposLaborales($id);
            $carrera->funciones_profesionales = $this->getFuncionesProfesionales($id);
            $carrera->mision_vision_objetivos = $this->getMisionVisionObjetivo($id);
            $carrera->perfiles_alumno = $this->getPerfilesAlumno($id);

            return $carrera;
        } catch (PDOException $e) {
            throw new \Exception("Error al obtener carrera: " . $e->getMessage());
        }
    }

    public function getCarreraBySlug($slug) {
        try {
            $stmt = $this->db->prepare("SELECT * FROM carreras WHERE url_slug = ?");
            $stmt->execute([$slug]);
            $carreraData = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$carreraData) return null;

            $carrera = new Carrera();
            foreach ($carreraData as $key => $value) {
                $carrera->$key = $value;
            }

            // Cargar relaciones
            $carrera->campos_laborales = $this->getCamposLaborales($carrera->id);
            $carrera->funciones_profesionales = $this->getFuncionesProfesionales($carrera->id);
            $carrera->mision_vision_objetivos = $this->getMisionVisionObjetivo($carrera->id);
            $carrera->perfiles_alumno = $this->getPerfilesAlumno($carrera->id);

            return $carrera;
        } catch (PDOException $e) {
            throw new \Exception("Error al obtener carrera por slug: " . $e->getMessage());
        }
    }

    // UPDATE
    public function updateCarrera($id, Carrera $carrera) {
        try {
            $this->db->beginTransaction();

            // Actualizar carrera principal
            $stmt = $this->db->prepare("
                UPDATE carreras SET
                    url_slug = ?,
                    title = ?,
                    tipo = ?,
                    imagen_banner = ?,
                    bg_color = ?,
                    foto_mascota = ?,
                    description = ?,
                    foto_ingreso = ?,
                    foto_egreso = ?
                WHERE id = ?
            ");
            
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

            // Eliminar y recrear relaciones
            $this->deleteRelatedEntities($id);
            $this->saveRelatedEntities($id, $carrera);

            $this->db->commit();
            return $this->getCarreraById($id);
        } catch (PDOException $e) {
            $this->db->rollBack();
            throw new \Exception("Error al actualizar carrera: " . $e->getMessage());
        }
    }

    // DELETE
    public function deleteCarrera($id) {
        try {
            $this->db->beginTransaction();

            // Eliminar relaciones primero
            $this->deleteRelatedEntities($id);

            // Eliminar carrera
            $stmt = $this->db->prepare("DELETE FROM carreras WHERE id = ?");
            $stmt->execute([$id]);

            if ($stmt->rowCount() === 0) {
                throw new \Exception("Carrera no encontrada");
            }

            $this->db->commit();
        } catch (PDOException $e) {
            $this->db->rollBack();
            throw new \Exception("Error al eliminar carrera: " . $e->getMessage());
        }
    }

    // Métodos auxiliares para relaciones
    private function getCamposLaborales($carreraId) {
        $stmt = $this->db->prepare("SELECT * FROM campos_laborales WHERE carrera_id = ? ORDER BY orden");
        $stmt->execute([$carreraId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    private function getFuncionesProfesionales($carreraId) {
        $stmt = $this->db->prepare("SELECT * FROM funciones_profesionales WHERE carrera_id = ? ORDER BY orden");
        $stmt->execute([$carreraId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    private function getMisionVisionObjetivo($carreraId) {
        $stmt = $this->db->prepare("SELECT * FROM mision_vision_objetivos WHERE carrera_id = ? ORDER BY orden");
        $stmt->execute([$carreraId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    private function getPerfilesAlumno($carreraId) {
        $stmt = $this->db->prepare("SELECT * FROM perfil_alumno WHERE carrera_id = ?");
        $stmt->execute([$carreraId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    private function saveRelatedEntities($carreraId, Carrera $carrera) {
        // Campos laborales
        if (!empty($carrera->campos_laborales)) {
            $stmt = $this->db->prepare("
                INSERT INTO campos_laborales (carrera_id, descripcion, orden)
                VALUES (?, ?, ?)
            ");
            
            foreach ($carrera->campos_laborales as $campo) {
                $stmt->execute([
                    $carreraId,
                    $campo['descripcion'],
                    $campo['orden'] ?? 0
                ]);
            }
        }

        // Funciones profesionales
        if (!empty($carrera->funciones_profesionales)) {
            $stmt = $this->db->prepare("
                INSERT INTO funciones_profesionales (carrera_id, descripcion, orden)
                VALUES (?, ?, ?)
            ");
            
            foreach ($carrera->funciones_profesionales as $funcion) {
                $stmt->execute([
                    $carreraId,
                    $funcion['descripcion'],
                    $funcion['orden'] ?? 0
                ]);
            }
        }

        // Mision/Vision/Objetivos
        if (!empty($carrera->mision_vision_objetivos)) {
            $stmt = $this->db->prepare("
                INSERT INTO mision_vision_objetivos (carrera_id, tipo, contenido, orden)
                VALUES (?, ?, ?, ?)
            ");
            
            foreach ($carrera->mision_vision_objetivos as $mvo) {
                $stmt->execute([
                    $carreraId,
                    $mvo['tipo'],
                    $mvo['contenido'],
                    $mvo['orden'] ?? 0
                ]);
            }
        }

        // Perfiles alumno
        if (!empty($carrera->perfiles_alumno)) {
            $stmt = $this->db->prepare("
                INSERT INTO perfil_alumno (carrera_id, tipo, descripcion)
                VALUES (?, ?, ?)
            ");
            
            foreach ($carrera->perfiles_alumno as $perfil) {
                $stmt->execute([
                    $carreraId,
                    $perfil['tipo'],
                    $perfil['descripcion']
                ]);
            }
        }
    }

    private function deleteRelatedEntities($carreraId) {
        $tables = [
            'campos_laborales',
            'funciones_profesionales',
            'mision_vision_objetivos',
            'perfil_alumno'
        ];

        foreach ($tables as $table) {
            $stmt = $this->db->prepare("DELETE FROM $table WHERE carrera_id = ?");
            $stmt->execute([$carreraId]);
        }
    }
}
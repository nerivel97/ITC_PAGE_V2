<?php
// model.php

class Carrera {
    public $id;
    public $url_slug;
    public $title;
    public $tipo;
    public $imagen_banner;
    public $bg_color;
    public $foto_mascota;
    public $description;
    public $foto_ingreso;
    public $foto_egreso;
    public $created_at;
    public $updated_at;

    public $campos_laborales = [];
    public $funciones_profesionales = [];
    public $mision_vision_objetivos = [];
    public $perfil_alumno = [];

    public static function fromArray(array $data): self {
        $carrera = new self();
        if (isset($data['id'])) $carrera->id = $data['id'];
        if (isset($data['url_slug'])) $carrera->url_slug = $data['url_slug'];
        if (isset($data['title'])) $carrera->title = $data['title'];
        if (isset($data['tipo'])) $carrera->tipo = $data['tipo'];
        if (isset($data['imagen_banner'])) $carrera->imagen_banner = $data['imagen_banner'];
        if (isset($data['bg_color'])) $carrera->bg_color = $data['bg_color'];
        if (isset($data['foto_mascota'])) $carrera->foto_mascota = $data['foto_mascota'];
        if (isset($data['description'])) $carrera->description = $data['description'];
        if (isset($data['foto_ingreso'])) $carrera->foto_ingreso = $data['foto_ingreso'];
        if (isset($data['foto_egreso'])) $carrera->foto_egreso = $data['foto_egreso'];
        if (isset($data['created_at'])) $carrera->created_at = $data['created_at'];
        if (isset($data['updated_at'])) $carrera->updated_at = $data['updated_at'];

        if (isset($data['campos_laborales']) && is_array($data['campos_laborales'])) {
            $carrera->campos_laborales = $data['campos_laborales'];
        }
        if (isset($data['funciones_profesionales']) && is_array($data['funciones_profesionales'])) {
            $carrera->funciones_profesionales = $data['funciones_profesionales'];
        }
        if (isset($data['mision_vision_objetivos']) && is_array($data['mision_vision_objetivos'])) {
            $carrera->mision_vision_objetivos = $data['mision_vision_objetivos'];
        }
        if (isset($data['perfil_alumno']) && is_array($data['perfil_alumno'])) {
            $carrera->perfil_alumno = $data['perfil_alumno'];
        }

        return $carrera;
    }
}

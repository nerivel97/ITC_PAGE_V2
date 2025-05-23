<?php
// app/Models/Carrera.php

namespace App\Models;

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

    // Relaciones
    public $campos_laborales = [];
    public $funciones_profesionales = [];
    public $misiones_visiones_objetivos = [];
    public $perfiles_alumno = [];
}
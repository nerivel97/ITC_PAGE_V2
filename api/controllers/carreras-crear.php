<?php

$config = require base_path('config.php');
extract($config['database']);

$db = new Database($config['database'], $username, $password);

$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!StringValidator::min($_POST['title'], 3)) {
        $errors['title'] = 'El título debe tener al menos 3 caracteres.';
    }

    if (!StringValidator::max($_POST['title'], 50)) {
        $errors['title'] = 'El título no puede tener más de 50 caracteres.';
    }

    if (!UnionLiteralValidator::validate(
        $_POST['tipo'],
        ['licenciatura', 'maestria', 'doctorado']
    )) {
        $errors['tipo'] = 'El tipo de carrera debe ser: licenciatura, maestria o doctorado.';
    }

    if (!StringValidator::max($_POST['description'], 500)) {
        $errors['description'] = 'La descripción no puede tener más de 500 caracteres.';
    }

    if (!StringValidator::match(
        $_POST['bg_color'],
        '/^#[a-f0-9]{6}$/i'
    )) {
        $errors['bg_color'] = 'El color de fondo debe ser un número hexadecimal.';
    }

    if (empty($errors)) {
        $db->query('INSERT INTO carreras (url_slug, title, tipo, description, bg_color) VALUES (:url_slug, :title, :tipo, :description, :bg_color)', [
            'url_slug' => convert_to_slug($_POST['title']),
            'title' => $_POST['title'],
            'tipo' => $_POST['tipo'],
            'description' => $_POST['description'],
            'bg_color' => $_POST['bg_color'],
            // 'imagen_banner' => $_FILES['imagen_banner']['name'],
            // 'foto_mascota' => $_FILES['foto_mascota']['name'],
            // 'foto_ingreso' => $_FILES['foto_ingreso']['name']
            // 'foto_egreso' => $_FILES['foto_egreso']['name']
        ]);
    }
}

$title = 'Crear carrera';

require base_path('views/carreras-crear.view.php');

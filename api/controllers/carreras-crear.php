<?php

$config = require base_path('config.php');
extract($config['database']);

$db = new Database($config['database'], $username, $password);

$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $errors = CarrerasValidator::validate($_POST);

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

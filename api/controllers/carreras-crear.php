<?php

$title = 'Crear carrera';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    dd($_POST);
}

require base_path('views/carreras-crear.view.php');

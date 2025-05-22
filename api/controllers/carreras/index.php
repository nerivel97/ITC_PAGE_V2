<?php

use Core\Database;

$config = require base_path('config.php');
extract($config['database']);

$db = new Database($config['database'], $username, $password);

$careers = $db->query('SELECT * FROM carreras')->findMany();

view('carreras/index', [
    'title' => 'Todas las carreras',
    'careers' => $careers,
]);

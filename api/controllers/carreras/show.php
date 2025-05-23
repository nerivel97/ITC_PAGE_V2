<?php

use Core\Database;

$config = require base_path('config.php');
extract($config['database']);

$db = new Database($config['database'], $username, $password);

$career = $db->query('SELECT * FROM carreras WHERE id = :id', [
    'id' => $_GET['id']
])->findOrFail();

view('carreras/show', [
    'title' => $career['title'],
    'heading' => $career['title'],
    'career' => $career,
]);

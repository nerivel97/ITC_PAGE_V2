<?php

use Core\Database;

$config = require base_path('config.php');
extract($config['database']);

$db = new Database($config['database'], $username, $password);

$db->query('DELETE FROM carreras WHERE id = :id', [
    'id' => $_POST['id']
]);

redirect('/carreras');

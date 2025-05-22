<?php

$config = require base_path('config.php');
extract($config['database']);

$db = new Database($config['database'], $username, $password);

$title = 'Carreras';

$careers = $db->query('SELECT * FROM carreras')->findMany();

require base_path('views/carreras/index.view.php');

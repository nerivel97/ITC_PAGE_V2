<?php

$router->get('/', 'index');

$router->get('/carreras', 'carreras/index');
$router->get('/carrera', 'carreras/show');
$router->delete('/carrera', 'carreras/destroy');

$router->get('/carreras/crear', 'carreras/create');
$router->post('/carreras', 'carreras/store');

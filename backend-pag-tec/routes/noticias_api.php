<?php
use Slim\Routing\RouteCollectorProxy;

use App\Controllers\NoticiasController;

$app->group('/api/noticias', function (RouteCollectorProxy $group) {
    // Rutas específicas primero
    $group->get('/search', 'NoticiasController:search');
    
    // Rutas genéricas después
    $group->get('/', 'NoticiasController:getAll');
    $group->get('/{id}', 'NoticiasController:getById');
    $group->post('/', 'NoticiasController:create');  // Asegúrate de que esta línea existe
    $group->put('/{id}', 'NoticiasController:update');
    $group->delete('/{id}', 'NoticiasController:delete');
});
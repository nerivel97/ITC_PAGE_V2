<?php
use Slim\Routing\RouteCollectorProxy;

use App\Controllers\EventosController;

$app->group('/api/eventos', function (RouteCollectorProxy $group) {
    // Rutas específicas primero
    $group->get('/search', 'EventosController:search');
    $group->get('/status/{status}', 'EventosController:getByStatus');
    
    // Rutas genéricas después
    $group->get('/', 'EventosController:getAll');
    $group->get('/{id}', 'EventosController:getById');
    $group->post('/', 'EventosController:create');
    $group->put('/{id}', 'EventosController:update');
    $group->delete('/{id}', 'EventosController:delete');
});
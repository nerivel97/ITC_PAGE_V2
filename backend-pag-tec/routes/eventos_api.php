<?php
use Slim\Routing\RouteCollectorProxy;

use App\Controllers\EventosController;

$app->group('/api/eventos', function (RouteCollectorProxy $group) {
    $group->get('/search', EventosController::class . ':search');
    $group->get('/status/{status}', EventosController::class . ':getByStatus');
    $group->get('/', EventosController::class . ':getAll');
    $group->get('/{id}', EventosController::class . ':getById');
    $group->post('/', EventosController::class . ':create');
    $group->put('/{id}', EventosController::class . ':update');
    $group->delete('/{id}', EventosController::class . ':delete');
});

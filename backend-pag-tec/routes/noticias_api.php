<?php
use Slim\Routing\RouteCollectorProxy;
use App\Controllers\NoticiasController;

$app->group('/api/noticias', function (RouteCollectorProxy $group) {
    $group->get('/search', NoticiasController::class . ':search');
    $group->get('/', NoticiasController::class . ':getAll');
    $group->get('/{id}', NoticiasController::class . ':getById');
    $group->post('/', NoticiasController::class . ':create');
    $group->put('/{id}', NoticiasController::class . ':update');
    $group->delete('/{id}', NoticiasController::class . ':delete');
});
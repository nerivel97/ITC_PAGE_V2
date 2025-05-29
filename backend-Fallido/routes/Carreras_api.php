<?php
// routes/api.php
use Slim\Routing\RouteCollectorProxy;

use App\Controllers\CarreraController;

$app->group('/api/carreras', function (RouteCollectorProxy $group) {
    $group->get('/', CarreraController::class . ':getAll');
    $group->get('/{id}', CarreraController::class . ':getById');
    $group->get('/slug/{slug}', CarreraController::class . ':getBySlug');
    $group->post('/', CarreraController::class . ':create');
    $group->put('/{id}', CarreraController::class . ':update');
    $group->delete('/{id}', CarreraController::class . ':delete');
});

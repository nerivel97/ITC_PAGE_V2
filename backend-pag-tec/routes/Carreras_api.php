<?php
// routes/api.php
use Slim\Routing\RouteCollectorProxy;

use App\Controllers\CarreraController;

$app->group('/api/carreras', function (RouteCollectorProxy $group) {
    $group->get('/', 'CarreraController:getAll');
    $group->get('/{id}', 'CarreraController:getById');
    $group->get('/slug/{slug}', 'CarreraController:getBySlug');
    $group->post('/', 'CarreraController:create');
    $group->put('/{id}', 'CarreraController:update');
    $group->delete('/{id}', 'CarreraController:delete');
});

// Ruta por defecto (404)
$app->map(['GET', 'POST', 'PUT', 'DELETE'], '/{routes:.+}', function ($request, $response) {
    $response->getBody()->write(json_encode([
        'status' => 'error',
        'message' => 'Ruta no encontrada'
    ]));
    return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
});
<?php
$requestUri = explode('?', $_SERVER['REQUEST_URI'])[0];
$method = $_SERVER['REQUEST_METHOD'];
$path = trim(str_replace('/api', '', $requestUri), '/');

switch ($path) {
    case 'carreras':
        require_once __DIR__ . '/controllers/carreras.php';
        (new CarreraController($db))->handle($method);
        break;

    default:
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Ruta no encontrada']);
}

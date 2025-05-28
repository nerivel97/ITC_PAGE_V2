<?php
$requestUri = explode('?', $_SERVER['REQUEST_URI'])[0];
$method = $_SERVER['REQUEST_METHOD'];
$path = trim(str_replace('/api', '', $requestUri), '/');

// Manejo de rutas base y con parámetros
$pathParts = explode('/', $path);
$basePath = isset($pathParts[0]) ? $pathParts[0] : '';

switch ($basePath) {
    case 'carreras':
        require_once __DIR__ . '/controllers/carreras.php';
        $controller = new CarreraController($db);
        $controller->handle($method);
        break;

    case 'eventos':
        require_once __DIR__ . '/controllers/eventos.php';
        $controller = new EventosController($db);
        
        // Extraer parámetros de la ruta
        if (isset($pathParts[1])) {
            if (is_numeric($pathParts[1])) {
                $_GET['id'] = $pathParts[1];
            } elseif ($pathParts[1] === 'search') {
                $_GET['q'] = isset($_GET['q']) ? $_GET['q'] : '';
            } elseif ($pathParts[1] === 'status') {
                $_GET['status'] = isset($_GET['status']) ? $_GET['status'] : '';
            }
        }
        
        $controller->handle($method);
        break;
        
    case 'noticias':
        require_once __DIR__ . '/controllers/noticias.php';
        $controller = new NoticiasController($db);
        
        // Extraer el ID si existe en la ruta (ej: /api/noticias/123)
        if (isset($pathParts[1])) {
            if (is_numeric($pathParts[1])) {
                $_GET['id'] = $pathParts[1];
            } elseif ($pathParts[1] === 'search') {
                $_GET['q'] = isset($_GET['q']) ? $_GET['q'] : '';
            }
        }
        
        $controller->handle($method);
        break;

    default:
        http_response_code(404);
        echo json_encode(array('success' => false, 'message' => 'Ruta no encontrada'));
        break;
}
<?php
declare(strict_types=1);

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use DI\Container;

// Cargar autoloader y variables de entorno
require __DIR__ . '/../vendor/autoload.php';

// Cargar variables de entorno
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();
$dotenv->required(['DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASS']);

// Crear contenedor PHP-DI
$container = new Container();

// Configurar base de datos en el contenedor
$container->set(PDO::class, function () {
    $host = $_ENV['DB_HOST'];
    $db = $_ENV['DB_NAME'];
    $user = $_ENV['DB_USER'];
    $pass = $_ENV['DB_PASS'];
    $charset = 'utf8mb4';

    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";

    return new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
});

// Configurar CarreraService
$container->set('CarreraService', function (Container $c) {
    return new \App\Services\CarreraService($c->get(PDO::class));
});

$container->set('EventoService', function(Container $c) {
    return new \App\Services\EventoService($c->get(PDO::class));
});

$container->set('NoticiaService', function(Container $c) {
    return new \App\Services\NoticiaService($c->get(PDO::class));
});

// Configurar CarreraController
$container->set('CarreraController', function (Container $c) {
    return new \App\Controllers\CarreraController($c->get(\App\Services\CarreraService::class));
});

$container->set('EventosController', function(Container $c) {
    return new \App\Controllers\EventosController($c->get(\App\Services\EventoService::class));
});

$container->set('NoticiasController', function(Container $c) {
    return new \App\Controllers\NoticiasController($c->get(\App\Services\NoticiaService::class));
});
// Crear aplicación con el contenedor
AppFactory::setContainer($container);
$app = AppFactory::create();

// Middleware para parsear JSON
$app->addBodyParsingMiddleware();

// Middleware de errores
$errorMiddleware = $app->addErrorMiddleware(
    filter_var($_ENV['APP_DEBUG'] ?? false, FILTER_VALIDATE_BOOLEAN),
    true,
    true
);

// Middleware CORS (solo para desarrollo)
$app->add(function (Request $request, $handler): Response {
    $response = $handler->handle($request);
    return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// Cargar rutas
require __DIR__ . '/../routes/Carreras_api.php';
require __DIR__ . '/../routes/eventos_api.php';
require __DIR__ . '/../routes/noticias_api.php';
$app->run();
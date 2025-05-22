<?php

$path = parse_url($_SERVER['REQUEST_URI'])['path'];

$routes = require base_path('routes.php');

route_to_controller($path, $routes);

function route_to_controller(string $path, array $routes): void {
    if (array_key_exists($path, $routes)) {
        require base_path("controllers/{$routes[$path]}.php");
    } else {
        abort();
    }
}

function abort(int $code = 404): void {
    http_response_code($code);
    require base_path("views/{$code}.php");
    die();
}

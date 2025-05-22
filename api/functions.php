<?php

function dd(mixed $data): void {
    echo "<pre>";
    var_dump($data);
    echo "</pre>";
    die();
}

function url_is(string $url): bool {
    return $_SERVER['REQUEST_URI'] === $url;
}

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

function authorize(
    bool $condition,
    int $statusCode = Response::FORBIDDEN
): void {
    if (!$condition) {
        abort($statusCode);
    }
}

function base_path(string $path): string {
    return __DIR__ . "/$path";
}

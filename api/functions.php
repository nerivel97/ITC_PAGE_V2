<?php

function dump(mixed $data): void {
    echo "<pre>";
    var_dump($data);
    echo "</pre>";
}

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

function strip_accents(string $string): string {
    return iconv('UTF-8', 'ASCII//TRANSLIT', $string);
}

function convert_to_slug(string $string): string {
    $string = trim($string);
    $string = strip_accents($string);
    $string = strtolower($string);
    $string = preg_replace('/[^a-z0-9]+/', '-', $string);
    return $string;
}

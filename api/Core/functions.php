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

function redirect(string $path): void {
    header("Location: $path");
    exit;
}

function base_path(string $path): string {
    return BASE_PATH . "$path";
}

function view(string $view, array $attributes = []): void {
    extract($attributes);
    require base_path("views/{$view}.view.php");
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

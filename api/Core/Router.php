<?php

namespace Core;

class Router {
    protected array $routes = [];

    public function add(string $method, string $uri, string $controller) {
        $this->routes[] = [
            'method' => strtoupper($method),
            'uri' => $uri,
            'controller' => $controller
        ];
    }

    public function get(string $uri, string $controller) {
        $this->add('GET', $uri, $controller);
    }

    public function post(string $uri, string $controller) {
        $this->add('POST', $uri, $controller);
    }

    public function put(string $uri, string $controller) {
        $this->add('PUT', $uri, $controller);
    }

    public function patch(string $uri, string $controller) {
        $this->add('PATCH', $uri, $controller);
    }

    public function delete(string $uri, string $controller) {
        $this->add('DELETE', $uri, $controller);
    }

    public function route(string $method, string $path) {
        foreach ($this->routes as $route) {
            if ($route['uri'] === $path && $route['method'] === strtoupper($method)) {
                return require base_path("controllers/{$route['controller']}.php");
            }
        }

        $this->abort();
    }

    protected function abort(int $code = 404): void {
        http_response_code($code);
        require base_path("views/{$code}.php");
        die();
    }
}

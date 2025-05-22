<?php

$path = parse_url($_SERVER['REQUEST_URI'])['path'];

$routes = require base_path('routes.php');

route_to_controller($path, $routes);

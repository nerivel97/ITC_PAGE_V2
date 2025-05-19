<?php
require_once './controllers/NoticiasController.php';

$controller = new NoticiasController();
$method = $_SERVER['REQUEST_METHOD'];
$id = $_GET['id'] ?? null;

$body = json_decode(file_get_contents('php://input'), true);

$controller->handleRequest($method, $id, $body);

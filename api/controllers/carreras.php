<?php
require_once __DIR__ . '/../services/carrera.php';
require_once __DIR__ . '/../models/carreras.php';

class CarreraController {
    private $service;

    public function __construct($db) {
        $this->service = new CarreraService($db);
    }

    public function handle($method) {
        $id = isset($_GET['id']) ? intval($_GET['id']) : null;
        $slug = isset($_GET['slug']) ? $_GET['slug'] : null;

        try {
            switch ($method) {
                case 'GET':
                    if ($id) {
                        $carrera = $this->service->getCarreraById($id);
                        $this->respond($carrera ? $carrera : null, $carrera ? 200 : 404);
                    } elseif ($slug) {
                        $carrera = $this->service->getCarreraBySlug($slug);
                        $this->respond($carrera ? $carrera : null, $carrera ? 200 : 404);
                    } else {
                        $this->respond($this->service->getAllCarreras());
                    }
                    break;

                case 'POST':
                    $data = json_decode(file_get_contents('php://input'), true);
                    if (!$data) return $this->respond(['message' => 'Datos inválidos'], 400);
                    $carrera = Carrera::fromArray($data);
                    $created = $this->service->createCarrera($carrera);
                    $this->respond($created, 201);
                    break;

                case 'PUT':
                    if (!$id) return $this->respond(['message' => 'ID requerido'], 400);
                    $data = json_decode(file_get_contents('php://input'), true);
                    if (!$data) return $this->respond(['message' => 'Datos inválidos'], 400);
                    $carrera = Carrera::fromArray($data);
                    $updated = $this->service->updateCarrera($id, $carrera);
                    $this->respond($updated);
                    break;

                case 'DELETE':
                    if (!$id) return $this->respond(['message' => 'ID requerido'], 400);
                    $this->service->deleteCarrera($id);
                    $this->respond(['message' => 'Carrera eliminada']);
                    break;

                default:
                    $this->respond(['message' => 'Método no permitido'], 405);
            }
        } catch (Exception $e) {
            $this->respond(['message' => $e->getMessage()], 500);
        }
    }

    private function respond($data, $code = 200) {
        http_response_code($code);
        echo json_encode([
            'success' => $code < 400,
            'data' => $data
        ]);
        exit;
    }
}

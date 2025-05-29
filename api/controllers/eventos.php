<?php
require_once __DIR__ . '/../services/evento.php';
require_once __DIR__ . '/../models/eventos.php';

class EventosController {
    private $service;

    public function __construct($db) {
        $this->service = new EventoService($db);
    }

    public function handle($method) {
        $id = isset($_GET['id']) ? intval($_GET['id']) : null;
        $query = isset($_GET['q']) ? $_GET['q'] : null;
        $status = isset($_GET['status']) ? $_GET['status'] : null;

        try {
            switch ($method) {
                case 'GET':
                    if ($id) {
                        $evento = $this->service->getEventoById($id);
                        $this->respond($evento ? $evento : null, $evento ? 200 : 404);
                    } elseif ($query) {
                        $this->respond($this->service->searchEventos($query));
                    } elseif ($status) {
                        $this->respond($this->service->getEventosByStatus($status));
                    } else {
                        $this->respond($this->service->getAllEventos());
                    }
                    break;

                case 'POST':
                    $data = json_decode(file_get_contents('php://input'), true);
                    if (!$data) return $this->respond(['message' => 'Datos inválidos'], 400);
                    $evento = Evento::fromArray($data);
                    $created = $this->service->createEvento($evento);
                    $this->respond($created, 201);
                    break;

                case 'PUT':
                    if (!$id) return $this->respond(['message' => 'ID requerido'], 400);
                    $data = json_decode(file_get_contents('php://input'), true);
                    if (!$data) return $this->respond(['message' => 'Datos inválidos'], 400);
                    $evento = Evento::fromArray($data);
                    $updated = $this->service->updateEvento($id, $evento);
                    $this->respond($updated);
                    break;

                case 'DELETE':
                    if (!$id) return $this->respond(['message' => 'ID requerido'], 400);
                    $this->service->deleteEvento($id);
                    $this->respond(['message' => 'Evento eliminado']);
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
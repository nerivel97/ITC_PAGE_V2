<?php
namespace App\Controllers;

use App\Models\Evento;
use App\Services\EventoService;
use Exception;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class EventosController {
    private $eventoService;

    public function __construct(EventoService $eventoService) {
        $this->eventoService = $eventoService;
    }

    public function getAll(Request $request, Response $response) {
        try {
            $eventos = $this->eventoService->getAllEventos();
            return $this->jsonResponse($response, [
                'success' => true,
                'data' => $eventos
            ], 200);
        } catch (Exception $e) {
            return $this->jsonResponse($response, [
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function getById(Request $request, Response $response, array $args) {
        try {
            $id = (int)$args['id'];
            $evento = $this->eventoService->getEventoById($id);
            
            if (!$evento) {
                return $this->jsonResponse($response, [
                    'success' => false,
                    'message' => 'Evento no encontrado'
                ], 404);
            }
            
            return $this->jsonResponse($response, [
                'success' => true,
                'data' => $evento
            ], 200);
        } catch (Exception $e) {
            return $this->jsonResponse($response, [
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function create(Request $request, Response $response) {
        try {
            $data = $request->getParsedBody();
            $evento = new Evento();
            
            $this->validateAndAssignData($data, $evento);
            
            $nuevoEvento = $this->eventoService->createEvento($evento);
            
            return $this->jsonResponse($response, [
                'success' => true,
                'data' => $nuevoEvento
            ], 201);
        } catch (Exception $e) {
            return $this->jsonResponse($response, [
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    public function update(Request $request, Response $response, array $args) {
        try {
            $id = (int)$args['id'];
            $data = $request->getParsedBody();
            $evento = new Evento();
            
            $this->validateAndAssignData($data, $evento);
            
            $eventoActualizado = $this->eventoService->updateEvento($id, $evento);
            
            return $this->jsonResponse($response, [
                'success' => true,
                'data' => $eventoActualizado
            ], 200);
        } catch (Exception $e) {
            return $this->jsonResponse($response, [
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    public function delete(Request $request, Response $response, array $args) {
        try {
            $id = (int)$args['id'];
            $this->eventoService->deleteEvento($id);
            
            return $this->jsonResponse($response, [
                'success' => true,
                'message' => 'Evento eliminado correctamente'
            ], 200);
        } catch (Exception $e) {
            return $this->jsonResponse($response, [
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function search(Request $request, Response $response) {
        try {
            $query = $request->getQueryParams()['q'] ?? '';
            $eventos = $this->eventoService->searchEventos($query);
            
            return $this->jsonResponse($response, [
                'success' => true,
                'data' => $eventos
            ], 200);
        } catch (Exception $e) {
            return $this->jsonResponse($response, [
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function getByStatus(Request $request, Response $response, array $args) {
        try {
            $status = $args['status'];
            $eventos = $this->eventoService->getEventosByStatus($status);
            
            return $this->jsonResponse($response, [
                'success' => true,
                'data' => $eventos
            ], 200);
        } catch (Exception $e) {
            return $this->jsonResponse($response, [
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    private function validateAndAssignData(array $data, Evento $evento) {
        // Validaciones básicas
        if (empty($data['nombre_evento'])) {
            throw new Exception('El nombre del evento es requerido');
        }
        
        if (empty($data['categoria'])) {
            throw new Exception('La categoría es requerida');
        }
        
        if (empty($data['descripcion'])) {
            throw new Exception('La descripción es requerida');
        }
        
        if (empty($data['fecha_inicio'])) {
            throw new Exception('La fecha de inicio es requerida');
        }
        
        if (empty($data['fecha_final'])) {
            throw new Exception('La fecha final es requerida');
        }
        
        if (empty($data['estado'])) {
            throw new Exception('El estado es requerido');
        }

        // Asignar datos
        $evento->nombre_evento = $data['nombre_evento'];
        $evento->categoria = $data['categoria'];
        $evento->descripcion = $data['descripcion'];
        $evento->fecha_inicio = $data['fecha_inicio'];
        $evento->fecha_final = $data['fecha_final'];
        $evento->estado = $data['estado'];
        $evento->imagen = $data['imagen'] ?? null;
    }

    private function jsonResponse(Response $response, array $data, int $statusCode): Response {
        $response->getBody()->write(json_encode($data));
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus($statusCode);
    }
}
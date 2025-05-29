<?php
// app/Controllers/CarreraController.php

namespace App\Controllers;

use App\Models\Carrera;
use App\Services\CarreraService;
use Exception;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class CarreraController {
    private $carreraService;

    public function __construct(CarreraService $carreraService) {
        $this->carreraService = $carreraService;
    }

    public function getAll(Request $request, Response $response) {
        try {
            $carreras = $this->carreraService->getAllCarreras();
            return $this->jsonResponse($response, [
                'success' => true,
                'data' => $carreras
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
            $carrera = $this->carreraService->getCarreraById($id);
            
            if (!$carrera) {
                return $this->jsonResponse($response, [
                    'success' => false,
                    'message' => 'Carrera no encontrada'
                ], 404);
            }
            
            return $this->jsonResponse($response, [
                'success' => true,
                'data' => $carrera
            ], 200);
        } catch (Exception $e) {
            return $this->jsonResponse($response, [
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function getBySlug(Request $request, Response $response, array $args): Response 
    {
        try {
            $slug = filter_var($args['slug'], FILTER_SANITIZE_STRING);
            $carrera = $this->carreraService->getCarreraBySlug($slug);
            
        if (!$carrera) {
                return $this->jsonResponse($response, [
                    'success' => false,
                    'message' => 'Carrera no encontrada'
                ], 404);
            }
            
            return $this->jsonResponse($response, [
                'success' => true,
                'data' => $carrera
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
            $carrera = new Carrera();
            
            $this->validateAndAssignData($data, $carrera);
            
            $nuevaCarrera = $this->carreraService->createCarrera($carrera);
            
            return $this->jsonResponse($response, [
                'success' => true,
                'data' => $nuevaCarrera
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
            $carrera = new Carrera();
            
            $this->validateAndAssignData($data, $carrera);
            
            $carreraActualizada = $this->carreraService->updateCarrera($id, $carrera);
            
            return $this->jsonResponse($response, [
                'success' => true,
                'data' => $carreraActualizada
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
            $this->carreraService->deleteCarrera($id);
            
            return $this->jsonResponse($response, [
                'success' => true,
                'message' => 'Carrera eliminada correctamente'
            ], 200);
        } catch (Exception $e) {
            return $this->jsonResponse($response, [
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    private function validateAndAssignData(array $data, Carrera $carrera) {
        // Validaciones básicas
        if (empty($data['url_slug'])) {
            throw new Exception('El campo url_slug es requerido');
        }
        
        if (empty($data['title'])) {
            throw new Exception('El campo title es requerido');
        }
        
        if (empty($data['tipo']) || !in_array($data['tipo'], ['licenciatura', 'maestria', 'doctorado'])) {
            throw new Exception('Tipo de carrera inválido');
        }

        // Validar relaciones si existen
        if (isset($data['campos_laborales']) && !is_array($data['campos_laborales'])) {
            throw new Exception('campos_laborales debe ser un array');
        }

        // Asignar datos principales
        $carrera->url_slug = $data['url_slug'];
        $carrera->title = $data['title'];
        $carrera->tipo = $data['tipo'];
        $carrera->imagen_banner = $data['imagen_banner'] ?? null;
        $carrera->bg_color = $data['bg_color'] ?? '#cdcdcd';
        $carrera->foto_mascota = $data['foto_mascota'] ?? null;
        $carrera->description = $data['description'] ?? null;
        $carrera->foto_ingreso = $data['foto_ingreso'] ?? null;
        $carrera->foto_egreso = $data['foto_egreso'] ?? null;

        // Asignar relaciones si existen
        $carrera->campos_laborales = $data['campos_laborales'] ?? [];
        $carrera->funciones_profesionales = $data['funciones_profesionales'] ?? [];
        $carrera->mision_vision_objetivos = $data['mision_vision_objetivos'] ?? [];
        $carrera->perfil_alumno = $data['perfil_alumno'] ?? [];
    }

    private function jsonResponse(Response $response, array $data, int $statusCode): Response {
        $response->getBody()->write(json_encode($data));
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus($statusCode);
    }
}
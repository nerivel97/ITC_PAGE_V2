<?php
namespace App\Controllers;

use App\Models\Noticia;
use App\Services\NoticiaService;
use Exception;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class NoticiasController {
    private $noticiaService;

    public function __construct(NoticiaService $noticiaService) {
        $this->noticiaService = $noticiaService;
    }

    public function getAll(Request $request, Response $response) {
        try {
            $noticias = $this->noticiaService->getAllNoticias();
            return $this->jsonResponse($response, [
                'success' => true,
                'data' => $noticias
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
            $noticia = $this->noticiaService->getNoticiaById($id);
            
            if (!$noticia) {
                return $this->jsonResponse($response, [
                    'success' => false,
                    'message' => 'Noticia no encontrada'
                ], 404);
            }
            
            return $this->jsonResponse($response, [
                'success' => true,
                'data' => $noticia
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
        
        // Validación básica
        if (empty($data['nombre_noticia']) || empty($data['descripcion']) || 
            empty($data['fecha_publicacion']) || empty($data['autor'])) {
            throw new Exception('Todos los campos son requeridos');
        }

        $noticia = new Noticia();
        $noticia->nombre_noticia = $data['nombre_noticia'];
        $noticia->descripcion = $data['descripcion'];
        $noticia->fecha_publicacion = $data['fecha_publicacion'];
        $noticia->autor = $data['autor'];
        $noticia->imagen = $data['imagen'] ?? null;

        $nuevaNoticia = $this->noticiaService->createNoticia($noticia);
        
        return $this->jsonResponse($response, [
            'success' => true,
            'data' => $nuevaNoticia
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
        
        if (empty($data)) {
            throw new Exception('No se recibieron datos para actualizar');
        }

        $noticia = new Noticia();
        // Asignar solo los campos recibidos
        if (isset($data['nombre_noticia'])) $noticia->nombre_noticia = $data['nombre_noticia'];
        if (isset($data['descripcion'])) $noticia->descripcion = $data['descripcion'];
        if (isset($data['fecha_publicacion'])) $noticia->fecha_publicacion = $data['fecha_publicacion'];
        if (isset($data['autor'])) $noticia->autor = $data['autor'];
        if (isset($data['imagen'])) $noticia->imagen = $data['imagen'];

        $noticiaActualizada = $this->noticiaService->updateNoticia($id, $noticia);
        
        return $this->jsonResponse($response, [
            'success' => true,
            'data' => $noticiaActualizada
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
            $this->noticiaService->deleteNoticia($id);
            
            return $this->jsonResponse($response, [
                'success' => true,
                'message' => 'Noticia eliminada correctamente'
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
            $noticias = $this->noticiaService->searchNoticias($query);
            
            return $this->jsonResponse($response, [
                'success' => true,
                'data' => $noticias
            ], 200);
        } catch (Exception $e) {
            return $this->jsonResponse($response, [
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    private function validateAndAssignData(array $data, Noticia $noticia) {
        // Validaciones básicas
        if (empty($data['nombre_noticia'])) {
            throw new Exception('El nombre de la noticia es requerido');
        }
        
        if (empty($data['descripcion'])) {
            throw new Exception('La descripción es requerida');
        }
        
        if (empty($data['fecha_publicacion'])) {
            throw new Exception('La fecha de publicación es requerida');
        }
        
        if (empty($data['autor'])) {
            throw new Exception('El autor es requerido');
        }

        // Asignar datos
        $noticia->nombre_noticia = $data['nombre_noticia'];
        $noticia->descripcion = $data['descripcion'];
        $noticia->fecha_publicacion = $data['fecha_publicacion'];
        $noticia->autor = $data['autor'];
        $noticia->imagen = $data['imagen'] ?? null;
    }

    private function jsonResponse(Response $response, array $data, int $statusCode): Response {
        $response->getBody()->write(json_encode($data));
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus($statusCode);
    }
}
<?php
namespace App\Controllers;

use App\Models\Noticias;
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
                    'message' => 'News not found'
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
            $noticia = new Noticias();
            
            $this->validateAndAssignData($data, $noticia);
            
            $newNoticia = $this->noticiaService->createNoticia($noticia);
            
            return $this->jsonResponse($response, [
                'success' => true,
                'data' => $newNoticia
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
            $noticia = new Noticias();
            
            $this->validateAndAssignData($data, $noticia);
            
            $updatedNoticia = $this->noticiaService->updateNoticia($id, $noticia);
            
            return $this->jsonResponse($response, [
                'success' => true,
                'data' => $updatedNoticia
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
                'message' => 'News deleted successfully'
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

    private function validateAndAssignData(array $data, Noticias $noticia) {
        if (empty($data['nombre_noticia'])) {
            throw new Exception('News title is required');
        }
        
        if (empty($data['descripcion'])) {
            throw new Exception('Description is required');
        }
        
        if (empty($data['fecha_publicacion'])) {
            throw new Exception('Publication date is required');
        }
        
        if (empty($data['autor'])) {
            throw new Exception('Author is required');
        }

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
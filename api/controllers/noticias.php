<?php
require_once __DIR__ . '/../services/noticia.php';
require_once __DIR__ . '/../models/noticias.php';

class NoticiasController {
    private $service;

    public function __construct($db) {
        $this->service = new NoticiaService($db);
    }

    public function handle($method) {
        $id = isset($_GET['id']) ? intval($_GET['id']) : null;
        $query = isset($_GET['q']) ? $_GET['q'] : null;

        try {
            switch ($method) {
                case 'GET':
                    if ($id) {
                        $noticia = $this->service->getNoticiaById($id);
                        $this->respond($noticia ? $noticia : null, $noticia ? 200 : 404);
                    } elseif ($query) {
                        $this->respond($this->service->searchNoticias($query));
                    } else {
                        $this->respond($this->service->getAllNoticias());
                    }
                    break;

                case 'POST':
                    $data = json_decode(file_get_contents('php://input'), true);
                    if (!$data) return $this->respond(['message' => 'Invalid data'], 400);
                    
                    $noticia = new Noticias();
                    $noticia->nombre_noticia = $data['nombre_noticia'];
                    $noticia->descripcion = $data['descripcion'];
                    $noticia->fecha_publicacion = $data['fecha_publicacion'];
                    $noticia->autor = $data['autor'];
                    $noticia->imagen = $data['imagen'] ?? null;
                    
                    $created = $this->service->createNoticia($noticia);
                    $this->respond($created, 201);
                    break;

                case 'PUT':
                    if (!$id) return $this->respond(['message' => 'ID required'], 400);
                    $data = json_decode(file_get_contents('php://input'), true);
                    if (!$data) return $this->respond(['message' => 'Invalid data'], 400);
                    
                    $noticia = new Noticias();
                    $noticia->nombre_noticia = $data['nombre_noticia'];
                    $noticia->descripcion = $data['descripcion'];
                    $noticia->fecha_publicacion = $data['fecha_publicacion'];
                    $noticia->autor = $data['autor'];
                    $noticia->imagen = $data['imagen'] ?? null;
                    
                    $updated = $this->service->updateNoticia($id, $noticia);
                    $this->respond($updated);
                    break;

                case 'DELETE':
                    if (!$id) return $this->respond(['message' => 'ID required'], 400);
                    $this->service->deleteNoticia($id);
                    $this->respond(['message' => 'News deleted']);
                    break;

                default:
                    $this->respond(['message' => 'Method not allowed'], 405);
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
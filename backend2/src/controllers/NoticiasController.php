<?php
require_once './services/NoticiaService.php';

class NoticiasController {
    private $noticiaService;

    public function __construct() {
        $this->noticiaService = new NoticiaService();
    }

    public function handleRequest($method, $id = null, $body = null) {
        switch ($method) {
            case 'GET':
                if ($id) {
                    $this->getById($id);
                } else {
                    $this->getAll();
                }
                break;
            case 'POST':
                $this->create($body);
                break;
            case 'PUT':
                $this->update($id, $body);
                break;
            case 'DELETE':
                $this->delete($id);
                break;
            default:
                $this->respond(405, ["error" => "Método no permitido"]);
        }
    }

    private function getAll() {
        $noticias = $this->noticiaService->getAllNoticias();
        $this->respond(200, $noticias);
    }

    private function getById($id) {
        $noticia = $this->noticiaService->getNoticiaById($id);
        if ($noticia) {
            $this->respond(200, $noticia);
        } else {
            $this->respond(404, ["error" => "Noticia no encontrada"]);
        }
    }

    private function create($data) {
        $nueva = $this->noticiaService->createNoticia($data);
        $this->respond(201, $nueva);
    }

    private function update($id, $data) {
        $actualizada = $this->noticiaService->updateNoticia($id, $data);
        $this->respond(200, $actualizada);
    }

    private function delete($id) {
        $this->noticiaService->deleteNoticia($id);
        $this->respond(200, ["message" => "Noticia eliminada"]);
    }

    private function respond($statusCode, $data) {
        http_response_code($statusCode);
        header('Content-Type: application/json');
        echo json_encode([
            "success" => $statusCode < 400,
            "data" => $data,
            "timestamp" => date(DATE_ATOM)
        ]);
    }
}

<?php
class Evento {
    public $id_evento;
    public $nombre_evento;
    public $categoria;
    public $descripcion;
    public $fecha_inicio;
    public $fecha_final;
    public $estado;
    public $imagen;

    public static function fromArray(array $data): self {
        $evento = new self();
        
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

        return $evento;
    }
}
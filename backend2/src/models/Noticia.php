<?php
class Noticia {
    public $id;
    public $nombre_noticia;
    public $descripcion;
    public $fecha_publicacion;
    public $autor;

    public function __construct($id, $nombre_noticia, $descripcion, $fecha_publicacion, $autor) {
        $this->id = $id;
        $this->nombre_noticia = $nombre_noticia;
        $this->descripcion = $descripcion;
        $this->fecha_publicacion = $fecha_publicacion;
        $this->autor = $autor;
    }
}

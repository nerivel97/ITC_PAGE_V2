<?php

use Core\StringValidator;
use Core\UnionLiteralValidator;

class CarrerasValidator {
    public static function validate(mixed $data): array {
        $errors = [];

        if (!StringValidator::min($data['title'], 3)) {
            $errors['title'] = 'El título debe tener al menos 3 caracteres.';
        }

        if (!StringValidator::max($data['title'], 50)) {
            $errors['title'] = 'El título no puede tener más de 50 caracteres.';
        }

        if (!UnionLiteralValidator::validate(
            $data['tipo'],
            ['licenciatura', 'maestria', 'doctorado']
        )) {
            $errors['tipo'] = 'El tipo de carrera debe ser: licenciatura, maestria o doctorado.';
        }

        if (!StringValidator::max($data['description'], 500)) {
            $errors['description'] = 'La descripción no puede tener más de 500 caracteres.';
        }

        if (!StringValidator::match(
            $data['bg_color'],
            '/^#[a-f0-9]{6}$/i'
        )) {
            $errors['bg_color'] = 'El color de fondo debe ser un número hexadecimal.';
        }

        return $errors;
    }
}

<?php

/**
 * StringValidator class
 *
 * This class provides methods to validate strings based on various criteria.
 */
class UnionLiteralValidator {
    /**
     * Validates if the given string is in the allowed types.
     *
     * @param mixed $value The string to validate.
     * @param array $allowed_types The array of allowed types.
     * @return bool True if the string is in the allowed types, false otherwise.
     */
    public static function validate(mixed $value, array $allowed_types): bool {
        return in_array($value, $allowed_types);
    }
}

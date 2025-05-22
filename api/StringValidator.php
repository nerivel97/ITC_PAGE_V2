<?php

/**
 * StringValidator class
 *
 * This class provides methods to validate strings based on various criteria.
 */
class StringValidator {
    /**
     * Validate if the string has a minimum length.
     *
     * @param mixed $value The string to validate.
     * @return bool True if minimum length is met, false otherwise.
     */
    public static function min(mixed $value, int $length): bool {
        if (strlen($value) < $length) {
            return false;
        }

        return true;
    }

    /**
     * Validate if the string has a maximum length.
     *
     * @param mixed $value The string to validate.
     * @return bool True if maximum length is met, false otherwise.
     */
    public static function max(mixed $value, int $length): bool {
        if (strlen($value) > $length) {
            return false;
        }

        return true;
    }

    /**
     * Validate if the string has an exact length.
     *
     * @param mixed $value The string to validate.
     * @return bool True if exact length is met, false otherwise.
     */
    public static function has_length(mixed $value, int $length): bool {
        if (strlen($value) !== $length) {
            return false;
        }

        return true;
    }

    /**
     * Validate if the string is empty.
     *
     * @param mixed $value The string to validate.
     * @return bool True if empty, false otherwise.
     */
    public static function is_empty(mixed $value): bool {
        if (empty($value)) {
            return true;
        }

        return false;
    }

    /**
     * Validate if the string matches a given pattern.
     *
     * @param mixed $value The string to validate.
     * @param string $pattern The regex pattern to match against.
     * @return bool True if matches, false otherwise.
     */
    public static function match(mixed $value, string $pattern): bool {
        if (!preg_match($pattern, $value)) {
            return false;
        }

        return true;
    }

    /**
     * Validate if the string is a valid email address.
     *
     * @param mixed $value The string to validate.
     * @return bool True if valid email, false otherwise.
     */
    public static function email(mixed $value): bool {
        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
            return false;
        }

        return true;
    }

    /**
     * Validate if the string is a valid url.
     *
     * @param mixed $value The string to validate.
     * @return bool True if valid url, false otherwise.
     */
    public static function url(mixed $value): bool {
        if (!filter_var($value, FILTER_VALIDATE_URL)) {
            return false;
        }

        return true;
    }
}

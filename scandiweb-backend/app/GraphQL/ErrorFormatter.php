<?php

namespace App\GraphQL;

use Throwable;

/**
 * Class ErrorFormatter
 *
 * Responsible for formatting exceptions into a GraphQL like error structure.
 */
class ErrorFormatter
{
    /**
     * Format a Throwable into a standardized error array.
     *
     * @param Throwable $e The caught exception or error.
     * @return array An associative array representing the formatted error.
     */
    public static function format(Throwable $e): array
    {
        return [
            'error' => [
                'message' => $e->getMessage(),
                'type' => get_class($e)
            ]
        ];
    }
}

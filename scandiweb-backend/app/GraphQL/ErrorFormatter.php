<?php

namespace App\GraphQL;

use Throwable;

class ErrorFormatter
{
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

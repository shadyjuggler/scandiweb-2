<?php

namespace App\Controller;

use App\GraphQL\GraphQLEngine;
use App\GraphQL\ErrorFormatter;
use Throwable;

/**
 * Entry point for handling GraphQL HTTP requests.
 */
class GraphQLController {

    /**
     * Handle the incoming GraphQL request.
     *
     * If exception occurs returns a formatted error.
     *
     * @return string JSON-encoded GraphQL response or error
     */
    public static function handle(): string {
        try {
            $engine = new GraphQLEngine();
            $response = $engine->handleRequest();
        } catch (Throwable $e) {
            $response = ErrorFormatter::format($e);
        }

        header('Content-Type: application/json; charset=UTF-8');
        return json_encode($response);
    }
}

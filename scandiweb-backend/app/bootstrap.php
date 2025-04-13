<?php

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

// CORS
$allowedOrigins = explode(',', $_ENV['CORS_ALLOWED_ORIGINS'] ?? '*');
$allowedMethods = explode(',', $_ENV['CORS_ALLOWED_METHODS'] ?? 'GET,POST,OPTIONS');
$allowedHeaders = explode(',', $_ENV['CORS_ALLOWED_HEADERS'] ?? 'Content-Type,Authorization');

$origin = $_SERVER['HTTP_ORIGIN'] ?? '*';

if (in_array('*', $allowedOrigins) || in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Vary: Origin");
}

header("Access-Control-Allow-Methods: " . implode(', ', $allowedMethods));
header("Access-Control-Allow-Headers: " . implode(', ', $allowedHeaders));

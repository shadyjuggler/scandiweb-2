<?php

require_once __DIR__ . '/../../vendor/autoload.php';

use Dotenv\Dotenv;
use App\Database\MigrationRunner;

$dotenv = Dotenv::createImmutable(__DIR__ . "/../../");
$dotenv->load();

$runner = new MigrationRunner();
$runner->run();

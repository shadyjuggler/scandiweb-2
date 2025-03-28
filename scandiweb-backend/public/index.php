<?php

require_once __DIR__ . '/../vendor/autoload.php';

use App\Models\Attribute;
use App\Models\ProductAttribute;
use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$dispatcher = FastRoute\simpleDispatcher(function(FastRoute\RouteCollector $r) {
    $r->post('/graphql', [App\Controller\GraphQLController::class, 'handle']);
});

$routeInfo = $dispatcher->dispatch(
    $_SERVER['REQUEST_METHOD'],
    $_SERVER['REQUEST_URI']
);

switch ($routeInfo[0]) {
    case FastRoute\Dispatcher::NOT_FOUND:
        // ... 404 Not Found
        break;
    case FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
        $allowedMethods = $routeInfo[1];
        // ... 405 Method Not Allowed
        break;
    case FastRoute\Dispatcher::FOUND:
        $handler = $routeInfo[1];
        $vars = $routeInfo[2];
        echo $handler($vars);
        break;
}

// print_r((new Attribute)->getWithValuesByProductId("ps-5"));

// print_r(
//     (new ProductAttribute)
//         // ->select(["display_value", "value"])
//         ->join("attribute_items", "attribute_item_id", "id")
//         ->where("product_attributes.product_id", "=", 'ps-5')
//         ->where("product_attributes.attribute_id", "=", "attribute_items.attribute_id")
//         ->get()
// );

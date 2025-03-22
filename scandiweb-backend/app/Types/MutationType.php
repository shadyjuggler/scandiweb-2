<?php

namespace App\Types;

use GraphQL\Type\Definition\ObjectType;
// use GraphQL\Type\Definition\Type;

class MutationType {
    public function get(): ObjectType {
        return new ObjectType([
            'name' => 'Mutation',
            'fields' => []
        ]);
    }
}

<?php

namespace App\Database\Seeders;

use App\Models\Product;
use App\Database\Seeder;
use App\Models\Category;
use App\Models\Gallery;
use App\Models\Currency;
use App\Models\Price;
use App\Models\Attribute;
use App\Models\AttributeItem;
use App\Models\ProductAttribute;


class ProductSeeder extends Seeder
{
    public function __construct(private array $data) {}

    public function run(): void
    {

        $categories = (new Category)->all();
        $currencyModel = new Currency;
        $attributeModel = new Attribute;
        $attributeItemModel = new AttributeItem;

        $this->log("Seeding products it's gallery, price and attributes...");

        foreach ($this->data['products'] as $productData) {

            // Products

            (new Product)->firstOrCreate([
                'id' => $productData['id'],
                'name' => $productData['name'],
                'description' => $productData['description'],
                'in_stock' => (int)$productData['inStock'],
                'brand' => $productData['brand'],
                'category_id' => array_find(
                    $categories,
                    fn($category) => $category['name'] == $productData['category']
                )['id']
            ]);


            // Product Gallery

            foreach ($productData['gallery'] as $index => $imageUrl) {
                (new Gallery)->firstOrCreate([
                    'url' => $imageUrl,
                    'position' => $index,
                    'product_id' => $productData['id']
                ]);
            }


            // Product Prices

            foreach ($productData['prices'] as $productPrice) {
                $currency = $currencyModel->firstWhere('label', $productPrice['currency']['label']);

                (new Price)->firstOrCreate([
                    'amount' => $productPrice['amount'],
                    'currency' => $currency['label'],
                    'product_id' => $productData['id']
                ]);
            }


            // Product Attributes

            foreach ($productData['attributes'] as $attributeSet) {

                // Makes sure that attribute exist
                $attribute = $attributeModel->firstWhere('name', $attributeSet['name']);
                if (!$attribute) continue;

                foreach ($attributeSet['items'] as $attributeSetItem) {
                    // Find matching attribute item
                    $attributeItem = $attributeItemModel->firstWhere('value', $attributeSetItem['value']);
                    if (!$attributeItem) continue;

                    (new ProductAttribute)->firstOrCreate([
                        'product_id' => $productData['id'],
                        'attribute_id' => $attribute['id'],
                        'attribute_item_id' => $attributeItem['id']
                    ]);
                }
            }
        }
    }
}

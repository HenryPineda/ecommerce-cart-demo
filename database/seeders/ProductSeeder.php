<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        Product::create([
            'name' => 'Apple iPhone 15',
            'price' => 999.00,
            'stock_quantity' => 50,
            'low_stock_threshold' => 10
        ]);
        
        Product::create([
            'name' => 'Samsung Galaxy S24',
            'price' => 899.00,
            'stock_quantity' => 45,
            'low_stock_threshold' => 10
        ]);
        
        Product::create([
            'name' => 'Sony WH-1000XM5 Headphones',
            'price' => 349.99,
            'stock_quantity' => 100,
            'low_stock_threshold' => 15
        ]);

         Product::create([
            'name' => 'MacBook Air M3',
            'price' => 1099.00,
            'stock_quantity' => 20,
            'low_stock_threshold' => 5
        ]);
    }
}

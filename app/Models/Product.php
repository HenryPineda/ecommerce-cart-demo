<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['name', 'price', 'stock_quantity', 'low_stock_threshold'];

    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $user = \Illuminate\Support\Facades\Auth::user();
        $cart = $user->cart()->with('items.product')->first();

        if (!$cart || $cart->items->isEmpty()) {
            return response()->json(['message' => 'Cart is empty'], 400);
        }

        $total = 0;
        foreach ($cart->items as $item) {
            $total += floatval($item->product->price) * $item->quantity;
        }

        $order = \App\Models\Order::create([
            'user_id' => $user->id,
            'total' => $total,
            'status' => 'completed'
        ]);

        foreach ($cart->items as $item) {
            \App\Models\OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'price' => $item->product->price
            ]);

            // Decrement stock
            $item->product->decrement('stock_quantity', $item->quantity);
        }

        // Clear the cart
        $cart->items()->delete();

        return response()->json(['message' => 'Order created', 'order_id' => $order->id], 201);
    }
}

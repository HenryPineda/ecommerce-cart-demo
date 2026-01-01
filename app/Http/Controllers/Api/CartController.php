<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index()
    {
        $cart = \Illuminate\Support\Facades\Auth::user()->cart()->with('items.product')->firstOrCreate([
            'user_id' => \Illuminate\Support\Facades\Auth::id()
        ]);
        
        return $cart->items;
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $cart = \Illuminate\Support\Facades\Auth::user()->cart()->firstOrCreate([
            'user_id' => \Illuminate\Support\Facades\Auth::id()
        ]);

        $item = $cart->items()->where('product_id', $request->product_id)->first();

        if ($item) {
            $item->increment('quantity', $request->quantity);
        } else {
            $item = $cart->items()->create([
                'product_id' => $request->product_id,
                'quantity' => $request->quantity
            ]);
        }

        // Check for low stock and dispatch notification
        $product = \App\Models\Product::find($request->product_id);
        if ($product && $product->stock_quantity <= $product->low_stock_threshold) {
            \App\Jobs\SendLowStockNotification::dispatch($product);
        }

        return $item->load('product');
    }

    public function update(Request $request, $itemId)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        $item = \App\Models\CartItem::where('id', $itemId)
            ->whereHas('cart', function($q) {
                $q->where('user_id', \Illuminate\Support\Facades\Auth::id());
            })
            ->firstOrFail();

        $item->update(['quantity' => $request->quantity]);

        return $item;
    }

    public function destroy($itemId)
    {
         $item = \App\Models\CartItem::where('id', $itemId)
            ->whereHas('cart', function($q) {
                $q->where('user_id', \Illuminate\Support\Facades\Auth::id());
            })
            ->firstOrFail();

        $item->delete();

        return response()->noContent();
    }
}

<x-mail::message>
# Low Stock Alert

The following product is running low on stock:

- **Product:** {{ $product->name }}
- **Current Stock:** {{ $product->stock_quantity }}
- **Threshold:** {{ $product->low_stock_threshold }}

Please restock soon.

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>

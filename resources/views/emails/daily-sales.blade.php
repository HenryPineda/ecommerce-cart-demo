<x-mail::message>
# Daily Sales Report

**Date:** {{ now()->toDateString() }}

**Total Orders:** {{ $orders->count() }}
**Total Revenue:** ${{ number_format($total, 2) }}

@if($orders->count() > 0)
## Order Details

@foreach($orders as $order)
**Order #{{ $order->id }}** - ${{ number_format($order->total, 2) }}
@foreach($order->items as $item)
- {{ $item->product->name }} x{{ $item->quantity }} (${{ number_format($item->price, 2) }})
@endforeach

@endforeach
@else
No orders were placed today.
@endif

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>

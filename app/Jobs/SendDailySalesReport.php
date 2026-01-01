<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class SendDailySalesReport implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $orders = \App\Models\Order::with('items.product')
            ->whereDate('created_at', now()->toDateString())
            ->get();

        $total = $orders->sum('total');

        $adminEmail = config('mail.admin_email', 'admin@example.com');
        \Illuminate\Support\Facades\Mail::to($adminEmail)->send(new \App\Mail\DailySalesReport($orders, $total));
    }
}

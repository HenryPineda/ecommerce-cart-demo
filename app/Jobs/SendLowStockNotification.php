<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class SendLowStockNotification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public \App\Models\Product $product)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $adminEmail = config('mail.admin_email', 'admin@example.com');
        \Illuminate\Support\Facades\Mail::to($adminEmail)->send(new \App\Mail\LowStockNotification($this->product));
    }
}

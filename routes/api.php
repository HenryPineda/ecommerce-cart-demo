<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/products', [App\Http\Controllers\Api\ProductController::class, 'index']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/cart', [App\Http\Controllers\Api\CartController::class, 'index']);
    Route::post('/cart', [App\Http\Controllers\Api\CartController::class, 'store']);
    Route::put('/cart/{item}', [App\Http\Controllers\Api\CartController::class, 'update']);
    Route::delete('/cart/{item}', [App\Http\Controllers\Api\CartController::class, 'destroy']);
    Route::post('/orders', [App\Http\Controllers\Api\OrderController::class, 'store']);
});

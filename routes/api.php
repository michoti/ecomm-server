<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::middleware(['auth:sanctum'])
    ->group(function () {
    Route::get('/', [ProductController::class, 'index']);
    Route::get('/product/{product:slug}', [ProductController::class, 'show']);       
});

Route::prefix('/cart')->group(function(){
    Route::get('/', [CartController::class, 'index']);
    Route::post('/add/{product:slug}', [CartController::class, 'add']);
    Route::delete('/remove/{product:slug}', [CartController::class, 'remove']);
    Route::put('/updated-quantity/{product:slug}', [CartController::class, 'updateQuantity']);
});

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

<?php

use App\Http\Controllers\Auth\VerifyEmailController;
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

Route::middleware(['guestOrVerified'])
    ->group(function () {
        Route::get('/products', [ProductController::class, 'index']);
        Route::post('/product/{product:id}', [ProductController::class, 'show']);

        Route::prefix('/cart')->group(function () {
            Route::get('/', [CartController::class, 'index']);
            Route::post('/add/{product:id}', [CartController::class, 'add']);
            Route::delete('/remove/{product:id}', [CartController::class, 'remove']);
            Route::put('/updated-quantity/{product:id}', [CartController::class, 'updateQuantity']);
        });
    });

    Route::get('/email/verify/{id}/{hash}', [VerifyEmailController::class, '__invoke'])
    ->middleware(['auth', 'signed', 'throttle:6,1'])
    ->name('verification.verify');

    Route::post('/email/verify/resend', function (Request $request) {
        $request->user()->sendEmailVerificationNotification();
        return back()->with('message', 'Verification link sent!');
    })->middleware(['auth', 'throttle:6,1'])->name('verification.send');



Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
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

route::post('login', [UserController::class, 'login']);
Route::post('create-user', [UserController::class, 'createUser']);
Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post('create-post', [PostController::class, 'createPost']);
    Route::get('get-posts', [PostController::class, 'getPosts']);
    Route::put('update-post/{id}', [PostController::class, 'updatePost']);
    Route::delete('delete-post/{id}', [PostController::class, 'deletePost']);
    route::post('logout', [UserController::class, 'logout']);
});

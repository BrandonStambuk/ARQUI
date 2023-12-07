<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Firebase\PlantaController;

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

/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/

Route::post('insertarPlanta', [PlantaController::class, 'store']);
Route::post('actualizarPlanta/{id}', [PlantaController::class, 'update']);
Route::delete('eliminarPlanta/{id}', [PlantaController::class, 'destroy']);
Route::get('obtenerPlantas', [PlantaController::class, 'index']);
Route::get('obtenerPlanta/{id}', [PlantaController::class, 'show']);
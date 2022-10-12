<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\FavoriteController;
use App\Http\Controllers\API\SearchCriteriaController;
use App\Http\Controllers\API\LoginWithGoogleController;
use App\Http\Controllers\API\IdentityProviderController;
use App\Http\Controllers\API\PlacesApiController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//新規登録、ログイン時のルーティング
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::get('confirm', [AuthController::class, 'confirm']);

//Google maps Places API 関連のルーティング
Route::post('search', [PlacesApiController::class, 'search']);
Route::post('photo', [PlacesApiController::class, 'getPlacePhoto']);
Route::post('geometry', [PlacesApiController::class, 'getLocation']);


//Laravel側でアクセス制限を行いたいルーティングにミドルウェアのauth:sanctumを設定する。
Route::middleware('auth:sanctum')->group(function() {
    //ログアウト時のルーティング
    Route::post('logout', [AuthController::class, 'logout']);

    //Favorite関連のルーティング
    Route::post('favorite/index', [FavoriteController::class, 'index']);
    Route::post('favorite/store', [FavoriteController::class, 'store']);
    Route::post('favorite/delete', [FavoriteController::class, 'delete']);

    //SearchCriteria関連のルーティング
    Route::post('criteria/index', [SearchCriteriaController::class, 'index']);
    Route::post('criteria/store', [SearchCriteriaController::class, 'store']);
    Route::post('criteria/delete', [SearchCriteriaController::class, 'delete']);
});



//ソーシャルログインのためのルーティング
Route::get("login/{provider}", [
    IdentityProviderController::class, 
    "getProviderOAuthURL"
]);
Route::get("login/{provider}/callback", [
    IdentityProviderController::class, 
    "handleProviderCallback"
]);
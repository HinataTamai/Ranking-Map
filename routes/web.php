<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


//通常where制約外のパスでアクセスすると404が返るが、
//全受けにすることで200が返ってしまう事があるため、
// apiプレフィックスは除外
Route::get('/{any?}', function () {
    return view('index');
})->where('any', '(?!api).+');



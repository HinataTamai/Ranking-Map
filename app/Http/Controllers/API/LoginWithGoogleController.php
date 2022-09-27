<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Exception;

class LoginWithGoogleController extends Controller
{
    
    public function redirectToGoogle() {
        return Socialite::driver("google")->redirect();
    }


    public function handleGoogleCallback() {
        try {
            //ユーザの詳細情報取得
            $user = Socialite::driver("google")->user();
            $findUser = User::where("google_id", $user->id)->first();

            if ($findUser) { 
                //rankingMap登録済ユーザの場合
                //ログイン処理
                $token = $findUser->createToken($findUser->email.'_Token')->plainTextToken;
                
                return response()->json([
                    'status'=>200,
                    'username'=>$findUser->name,
                    'token'=>$token,
                    'message'=>'ログインしました。'
                ]);
            } else {
                //未登録の場合
                $newUser = User::create([
                    "name" => $user->name,
                    "email" => $user->email,
                    "google_id" => $user->id,
                    "password" => encrypt("123456dummy"),
                ]);
                
                //ログイン処理
                $token = $newUser->createToken($newUser->email.'_Token')->plainTextToken;
                
                return response()->json([
                    'status'=>200,
                    'username'=>$findUser->name,
                    'token'=>$token,
                    'message'=>'会員登録完了。ログインしました。'
                ]);
            }
        } catch (Exception $e) {
            \Log::error($e);
            throw $e->getMessage();
        }
    }
}

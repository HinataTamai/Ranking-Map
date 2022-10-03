<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use App\Models\IdentityProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;



class IdentityProviderController extends Controller
{
    public function getProviderOAuthURL(string $provider) {
        $redirectUrl = Socialite::driver($provider)->redirect()->getTargetUrl();
        return response()->json([
            'redirect_url' => $redirectUrl,
        ]);
    }

    public function handleProviderCallback(string $provider, Request $request) {
        // ユーザ情報の取得
        $provider_user = Socialite::driver($provider)->user();
        $identity_provider = IdentityProvider::where('provider_user_id', $provider_user->getId())->first();
        
        if($identity_provider) { 
            //登録済ユーザの場合はログイン処理
            $user = User::where('id', $identity_provider->user_id)->first();

            if (Auth::loginUsingId( $user->id, true)){
                $request->session()->regenerate();
    
                return response()->json([
                    'id' => $user->id,
                    'status'=> 200,
                    'message'=>'ログインしました。'
                ]);
            }

        } else {
            //未登録の場合は新規登録してログイン
            
            //プロバイダから取得したemailが登録済みemailと一致した場合
            // = 登録済ではあるが、初めてソーシャルアカウントを用いたログインを行う場合
            $user = User::where('email', $provider_user->getEmail())->first();
            
            
            if(!$user) {    //上記の条件に当てはまらない場合
                $user = User::create([
                    'name' => ($provider_user->getName()) ? $provider_user->getName() : $provider_user->getNickname(),
                    'email' => $provider_user->getEmail(),
                    "password" => encrypt(Str::random(20)),
                ]);
                $user->email_verified_at = Carbon::now();
                $user->save();
            }

            // IdentityProviderテーブルに新規登録処理
            IdentityProvider::create([
                'user_id' => $user->id,
                'provider_name' => $provider,
                'provider_user_id' => $provider_user->getId(),
            ]);

            //ログイン処理
            if (Auth::loginUsingId($user->id, true)){
                $request->session()->regenerate();
                return response()->json([
                    'id' => $user->id,
                    'status'=> 200,
                    'message'=>'ログインしました。'
                ]);
            }
        }
        return true;
    }
}

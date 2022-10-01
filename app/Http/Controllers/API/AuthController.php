<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\MessageBag;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use Validator;

class AuthController extends Controller
{
    public function register(RegisterRequest $request){

        //Usersテーブルに追加
        $user = User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>Hash::make($request->password),
        ]);


        //ログイン処理
        $credentials = [
            'email' => $request->email,
            'password' => $request->password
        ];
        $remember = $request->remember;

        if (Auth::attempt($credentials, $remember)){
            $request->session()->regenerate();
            $user = User::where('email', $request->email)->first();

            return response()->json([
                'id' => $user->id,
                'status'=> 200,
                'message'=>'会員登録が完了しました。'
            ]);
        }
    }


    public function login(LoginRequest $request) {

        $credentials = [
            'email' => $request->email,
            'password' => $request->password
        ];
        $remember = $request->remember;
        
        if (! Auth::attempt($credentials, $remember)){
            // $error = $validator->errors()->toArray();
            return response()->json([
                'status' => 401,
                'message' => 'メールアドレスまたはパスワードが一致しません。'
            ]);
        } else {
            $request->session()->regenerate();
            $user = User::where('email', $request->email)->first();

            return response()->json([
                'id' => $user->id,
                'status'=> 200,
                'message'=>'ログインしました。'
            ]);
        }
    }


    public function logout(Request $request){

        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json([
            'status'=>200,
            'message'=>'ログアウトしました。',
        ]);
    }

    public function confirm(){

        if (Auth::check()) {    // ユーザーはログイン済み
            // 現在認証しているユーザーのIDを取得
            $id = Auth::id();
            return response()->json([
                'status' => 200,
                'user_id' => $id
            ]);
        } else {
            return response()->json([
                'status' => 401,
            ]);
        }
    }
}

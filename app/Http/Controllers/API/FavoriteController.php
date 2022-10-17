<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Favorite;
use App\Models\User;


class FavoriteController extends Controller
{

    public function index(Request $request)
    {
        $favorites = User::with('favorites')->where('id',$request->userId)->get();
        return response()->json($favorites, 200);
    }

    //新規お気に入り追加処理
    public function store(Request $request){

        
        //同じ施設（place_idが同じ）が既に存在するか確認
        $favorite = Favorite::where('place_id',$request->placeId)->first();

        if(!$favorite) {    //存在しない場合

            //新しいfavoriteを作成
            $favorite = Favorite::create([
                'name' => $request->name, 
                'place_id' => $request->placeId, 
                'rate' => $request->rate, 
                'user_ratings_total' => $request->userRatingsTotal,
                'photo_reference' => $request->photoReference,
                'photo_attribution' => $request->photoAttribution,
            ]);

        } else {    //存在する場合

            //place_id以外のデータを更新
            $favorite->name = $request->name;
            $favorite->rate = $request->rate;
            $favorite->user_ratings_total = $request->userRatingsTotal;
            $favorite->photo_reference = $request->photoReference;
            $favorite->photo_attribution = $request->photoAttribution;
            $favorite->save();
        }
        //ここまでで$favoriteには何らかのレコードが入っている状態

        //ユーザ情報を取得
        $user = User::where('id', $request->userId)->first();

        if(!$user){    
            return response()->json([
                'status' => 401,
            ]);
        } else {

            $user->favorites()->attach($favorite->id);

            return response()->json([
                'status' => 200,
            ]);
        }
    }


    public function delete(Request $request) {

        $favorite = Favorite::where('place_id',$request->placeId)->first();

        if(!$favorite){

        } else {
            $user = User::where('id', $request->userId)->first();

            if(!$user) {
                return response()->json([
                    'status'=> 401
                ]);
            } else {
                $user->favorites()->detach($favorite->id);
                return response()->json([
                    'status'=>200
                ]);
            }

        }
    }
}

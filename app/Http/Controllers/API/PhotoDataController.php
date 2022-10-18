<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PlacePhoto;


class PhotoDataController extends Controller
{

    public function getData(Request $request) {
        $data = PlacePhoto::where('place_id', $request->placeId)->first();

        if(!$data) {
            return response()->json([
                'status' => 404
            ]);
        } else {
            return response()->json([
                'status' => 200,
                'photo_data' => $data->photo_data,
                'photo_attribution' => $data->photo_attribution
            ]) ;
        }
    }

    public function store (Request $request){
        //同じ施設（place_idが同じ）が既に存在するか確認
        $place = PlacePhoto::where('place_id',$request->placeId)->first();

        if(!$place) {    //存在しない場合

            //新しいデータを追加
            PlacePhoto::create([ 
                'place_id' => $request->placeId, 
                'photo_data' => $request->photoData,
                'photo_attribution' => $request->photoAttribution
            ]);
            
        
        } else {    //存在する場合
        
            //photo_dataを更新
            $place->photo_data = $request->photoData;
            $place->photo_attribution = $request->photoAttribution;
            $place->save();
        }
    }
}

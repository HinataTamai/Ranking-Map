<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PlacesApiController extends Controller
{
    public function search (Request $request){
        //url作成
        $apiUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
        $apiUrl .= '?keyword=' . urlencode($request->keyword);
        $apiUrl .= '&location=' . $request->lat . ',' . $request->lng;
        $apiUrl .= '&radius=' . $request->radius;
        $apiUrl .= '&opennow=' . $request->openNow;
        $apiUrl .= '&language=ja';
        $apiUrl .= '&key=' . config('services.google-map.apikey');
        
        //エラー発生時にもレスポンスを受け取るため、ignore_errors => true
        $context = stream_context_create(array(
            'http' => array('ignore_errors' => true)
        ));

        $placeJson = file_get_contents($apiUrl, false, $context);
        return response($placeJson);
    }




    public function getLocation (Request $request){
        $apiUrl = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json';
        $apiUrl .= '?fields=geometry';
        $apiUrl .= '&inputtype=textquery';
        $apiUrl .= '&input=' . urlencode($request->keyword);
        $apiUrl .= '&key=' . config('services.google-map.apikey');

        //エラー発生時にもレスポンスを受け取るため、ignore_errors => true
        $context = stream_context_create(array(
            'http' => array('ignore_errors' => true)
        ));

        $geometry = file_get_contents($apiUrl, false, $context);
        return response($geometry);
    } 

    
    public function getPlacePhoto (Request $request) {
        $apiUrl = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400';
        $apiUrl .= '&photo_reference=' . $request->reference;
        $apiUrl .= '&key=' . config('services.google-map.apikey');

        //エラー発生時にもレスポンスを受け取るため、ignore_errors => true
        $context = stream_context_create(array(
            'http' => array('ignore_errors' => true)
        ));

        $photo = file_get_contents($apiUrl, false, $context);
        return response($photo);
    }
}

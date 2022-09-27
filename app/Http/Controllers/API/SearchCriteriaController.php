<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SearchCriteria;
use App\Models\User;

class SearchCriteriaController extends Controller
{
    public function index (Request $request ) {
        $user = User::where('id', $request->userId)->first();

        if(!$user) {
            return response()->json([
                'status' => 401
            ]);
        } else {
            $criteria = SearchCriteria::where('user_id', $user->id)->first();
            if(!$criteria) {
                return response()->json([
                    'status' => 204
                ]);
            } else {
                return response()->json([
                    'status' => 200,
                    'location' => $criteria->location ,
                    'keyword' => $criteria->keyword,
                    'radius' => $criteria->radius,
                    'rateCriteria' => $criteria->rate_criteria,
                    'ratingsTotalCriteria' => $criteria->ratings_total_criteria,
                    'distanceCriteria' => $criteria->distance_criteria,
                    'onlyIsOpen' => $criteria->only_is_open,
                ]);
            }
        }
    }


    public function store (Request $request ) {
        $user = User::where('id', $request->userId)->first();

        if(!$user) {
            return response()->json([
                'status' => 401
            ]);
        } else {
            $criteria = SearchCriteria::where('user_id', $user->id)->first();

            if(!$criteria) {
                $criteria = SearchCriteria::create([
                    'user_id' => $request->userId,
                    'location' => $request->location,
                    'keyword' => $request->keyword,
                    'radius' => $request->radius,
                    'rate_criteria' => $request->rateCriteria,
                    'ratings_total_criteria' => $request->ratingsTotalCriteria,
                    'distance_criteria' => $request->distanceCriteria,
                    'only_is_open' => $request->onlyIsOpen,
                ]);
            } else {
                $criteria->location = $request->location;
                $criteria->keyword = $request->keyword;
                $criteria->radius = $request->radius;
                $criteria->rate_criteria = $request->rateCriteria;
                $criteria->ratings_total_criteria = $request->ratingsTotalCriteria;
                $criteria->distance_criteria = $request->distanceCriteria;
                $criteria->only_is_open = $request->onlyIsOpen;
                $criteria->save();
            }

            return response()->json([
                'status' => 200,
            ]); 
            

        }
    }

    public function delete (Request $request) {
        $user = User::where('id', $request->userId)->first();

        if(!$user) {
            return response()->json([
                'status' => 401
            ]);
        } else {
            $criteria = SearchCriteria::where('user_id', $user->id)->first();
            if(!$criteria) {
                return response()->json([
                    'status' => 204
                ]);
            } else {
                $criteria->delete();
                return response()->json([
                    'status' => 200
                ]);
            }
        }
    } 
}

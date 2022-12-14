<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlacePhoto extends Model
{
    use HasFactory;

    protected $fillable = ['place_id','photo_data','photo_attribution'];
}

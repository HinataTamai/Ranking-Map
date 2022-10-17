<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;


class Favorite extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'place_id', 'rate', 'user_ratings_total', 'photo_attribution', 'photo_reference'];

    public function users () {
        return $this->belongsToMany(User::class);
    }
}

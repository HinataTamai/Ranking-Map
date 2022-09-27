<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SearchCriteria extends Model
{
    use HasFactory;

    protected $table = 'search_criteria';

    protected $fillable = ['user_id', 'location', 'keyword', 'radius', 'rate_criteria', 'ratings_total_criteria', 'distance_criteria', 'only_is_open'];

}

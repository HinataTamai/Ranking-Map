<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SearchCriteriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('search_criteria')->insert([
            [
                'id' => '1',
                'user_id' => '1',
                'location' => '京都',
                'keyword' => 'SushiTaro',
                'radius' => '500',
                'rate_criteria' => 'heigh',
                'ratings_total_criteria' => 'many',
                'distance_criteria' => 'near',
                'only_is_open' => true,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'id' => '2',
                'user_id' => '2',
                'location' => '大阪',
                'keyword' => 'YakinikuTaro',
                'radius' => '5000',
                'rate_criteria' => 'heigh',
                'ratings_total_criteria' => 'many',
                'distance_criteria' => 'near',
                'only_is_open' => false,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],

        ]);
    }
    
}

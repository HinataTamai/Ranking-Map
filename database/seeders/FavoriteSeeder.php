<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FavoriteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('favorites')->insert([
            [
                'id' => '7',
                'name' => '寿司太郎',
                'place_id' => 'SushiTaro',
                'rate' => '4.5',
                'user_ratings_total' => '123',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'id' => '8',
                'name' => '焼肉太郎',
                'place_id' => 'YakinikuTaro',
                'rate' => '4.0',
                'user_ratings_total' => '111',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'id' => '9',
                'name' => '野菜太郎',
                'place_id' => 'YasaiTaro',
                'rate' => '5',
                'user_ratings_total' => '100',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
        ]);
    }
}

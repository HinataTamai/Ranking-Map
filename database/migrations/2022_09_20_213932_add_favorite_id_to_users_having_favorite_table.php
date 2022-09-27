<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users_having_favorite', function (Blueprint $table) {
            $table->unsignedBigInteger('favorite_id')->after('user_id');

            $table->foreign('favorite_id')->references('id')->on('favorites')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users_having_favorite', function (Blueprint $table) {
            $table->dropForeign('users_having_favorite_favorite_id_foreign');

            $table->dropColumn('favorite_id');
        });
    }
};

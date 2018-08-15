<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLabelsTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('labels', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('board_id');
            $table->string('name', 128);
            $table->string('color', 6)->nullable();
            $table->timestamps();
            $table->SoftDeletes();
            $table->foreign('board_id')->references('id')->on('boards');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('labels');
    }
}

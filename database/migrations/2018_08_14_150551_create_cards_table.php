<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCardsTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('cards', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('list_id');
            $table->string('title', 128);
            $table->text('description')->nullable();
            $table->unsignedInteger('stakeholder_id');
            $table->unsignedInteger('worker_id');
            $table->boolean('is_archived')->default(0);
            $table->dateTime('dev_due_at')->nullable();
            $table->dateTime('qa_due_at')->nullable();
            $table->dateTime('prod_due_at')->nullable();
            $table->timestamps();
            $table->SoftDeletes();
            $table->foreign('list_id')->references('id')->on('lists');
            $table->foreign('stakeholder_id')->references('id')->on('users');
            $table->foreign('worker_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('cards');
    }
}

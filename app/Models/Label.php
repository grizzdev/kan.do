<?php

namespace App\Models;

use LaravelArdent\Ardent\Ardent;
use Illuminate\Database\Eloquent\SoftDeletes;

class Label extends Ardent {

    use SoftDeletes;

    protected $dates = [
        'deleted_at',
    ];

    protected $fillable = [
        'board_id',
        'name',
        'color',
    ];

    public static $rules = [
        'board_id' => 'required|exists:boards|integer',
        'name' => 'required|alpha_dash|max:128',
        'color' => 'regex:#[A-Fa-f0-9]{6}',
    ];
}

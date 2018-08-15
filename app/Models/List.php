<?php

namespace App\Models;

use LaravelArdent\Ardent\Ardent;
use Illuminate\Database\Eloquent\SoftDeletes;

class list extends Ardent {

    use SoftDeletes;

    protected $dates = [
        'deleted_at'
    ];

    protected $fillable = [
        'board_id',
        'title',
    ];

    public static $rules = [
        'board_id' => 'required|exists:boards|integer',
        'title' => 'required|string|max:128',
    ];
}

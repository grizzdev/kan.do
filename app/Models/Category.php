<?php

namespace App\Models;

use LaravelArdent\Ardent\Ardent;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Ardent {

    use SoftDeletes;

    protected $dates = [
        'deleted_at'
    ];

    protected $fillable = [
    ];

    public static $rules = [
    ];
}

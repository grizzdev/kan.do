<?php

namespace App\Models;

use LaravelArdent\Ardent\Ardent;
use Illuminate\Database\Eloquent\SoftDeletes;

class Checklist extends Ardent {

    use SoftDeletes;

    protected $dates = [
        'deleted_at',
    ];

    protected $fillable = [
        'title',
    ];

    public static $rules = [
        'title' => 'required|alpha_dash|max:128',
    ];
}

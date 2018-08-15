<?php

namespace App\Models;

use LaravelArdent\Ardent\Ardent;
use Balping\HashSlug\HasHashSlug;
use Illuminate\Database\Eloquent\SoftDeletes;

class Board extends Ardent {

    use HasHashSlug, SoftDeletes;

    protected $dates = [
        'deleted_at'
    ];

    protected $fillable = [
        'team_id',
        'title',
    ];

    public static $rules = [
        'team_id' => 'required|exists:teams|integer',
        'title' => 'required|alpha_dash|max:128',
    ];

    // hasMany Users, Lists
}

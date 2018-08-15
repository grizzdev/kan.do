<?php

namespace App\Models;

use LaravelArdent\Ardent\Ardent;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Illuminate\Database\Eloquent\SoftDeletes;

class Message extends Ardent implements HasMedia {

    use HasMediaTrait, SoftDeletes;

    protected $dates = [
        'deleted_at'
    ];

    protected $fillable = [
        'user_id',
        'body',
    ];

    public static $rules = [
        'user_id' => 'required|exists:users|integer',
        'body' => 'required|string'
    ];
}

<?php

namespace App\Models;

use LaravelArdent\Ardent\Ardent;
use Balping\HashSlug\HasHashSlug;
use Cviebrock\EloquentTaggable\Taggable;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Illuminate\Database\Eloquent\SoftDeletes;

class Card extends Ardent implements HasMedia {

    use HasHashSlug, Taggable, HasMediaTrait, SoftDeletes;

    protected $dates = [
        'dev_due_at',
        'qa_due_at',
        'prod_due_at',
        'deleted_at'
    ];

    protected $fillable = [
        'list_id',
        'title',
        'description',
        'stakeholder_id',
        'worker_id',
        'is_archived',
        'dev_due_at',
        'qa_due_at',
        'prod_due_at',
    ];

    public static $rules = [
        'list_id' => 'required|exists:lists|integer',
        'title' => 'required|string|max:256',
        'description' => 'nullable|string',
        'stakeholder_id' => 'nullable|exists:users|integer',
        'worker_id' => 'nullable|exists:users|integer',
        'is_archived' => 'required|boolean',
        'dev_due_at' => 'nullable|date',
        'qa_due_at' => 'nullable|date',
        'prod_due_at' => 'nullable|date',
    ];

    /*
    ☐ hasMany Members (Users)
    ☐ belongsTo List
    ☐ hasMany Labels
    ☐ belongsTo Category
    ☐ hasMany Comments
    ☐ hasMany History(?)
    ☐ hasMany Watchers (Users)
    ☐ hasMany Attachments (MediaLibrary)
    ☐ hasMany TaskLists
    */

}

<?php

namespace App\Models;

use LaravelArdent\Ardent\Ardent;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Ardent {

    use SoftDeletes;

    protected $dates = [
        'completed_at',
        'deleted_at',
    ];

    protected $fillable = [
        'checklist_id',
        'title',
        'completed_at',
    ];

    public static $rules = [
        'checklist_id' => 'required|exists:checklists|integer',
        'title' => 'required|alpha_dash|max:128'
        'completed_at' => 'date'
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;
    protected $table = 'tasks';
    protected $primaryKey = 'id';
    protected $fillable = [
        'title',
        'description',
        'initiator',
        'assignees',
        'due_date',
        'completed_date',
        'priority',
        'status',
    ];

    public function images()
    {
        return $this->hasMany(TaskImage::class);
    }
}

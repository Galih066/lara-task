<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;

class Profile extends Model
{
    use HasFactory;
    protected $table = 'profiles';
    protected $primaryKey = 'id';
    protected $fillable = [
        'user_id',
        'organization_id',
        'first_name',
        'last_name',
        'phone',
        'birth_date',
        'gender',
        'job_title',
        'join_date',
        'address',
        'city',
        'state',
        'country',
        'postal_code',
        'department',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}

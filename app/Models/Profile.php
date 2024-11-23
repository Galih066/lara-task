<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
    ];
}

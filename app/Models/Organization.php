<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    use HasFactory;

    protected $table = 'organizations';

    protected $primaryKey = 'id';

    const SIZE_SMALL = '1-50 employees';
    const SIZE_MEDIUM = '51-200 employees';
    const SIZE_LARGE = '201-1000 employees';
    const SIZE_ENTERPRISE = '1000+ employees';

    protected $fillable = [
        'org_name',
        'user_id',
        'admin_email',
        'password',
        'description',
        'logo_path',
        'industry',
        'size_category',
        'location'
    ];
    
    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'password' => 'hashed',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public static function getSizeCategories()
    {
        return [
            self::SIZE_SMALL,
            self::SIZE_MEDIUM,
            self::SIZE_LARGE,
            self::SIZE_ENTERPRISE
        ];
    }
}

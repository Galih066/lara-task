<?php

namespace App\Services;

use App\Models\Organization;
use Illuminate\Support\Facades\Auth;

class OrganizationService
{
    public function createOrganization(array $data)
    {
        return Organization::create($data);
    }

    public function getOrganization()
    {
        return Organization::where('user_id', Auth::id())->first();
    }
}
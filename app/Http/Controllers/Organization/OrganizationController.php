<?php

namespace App\Http\Controllers\Organization;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Services\OrganizationService;

class OrganizationController extends Controller
{
    private $organizationService;

    public function __construct(OrganizationService $organizationService)
    {
        $this->organizationService = $organizationService;
    }

    public function index()
    {
        $user = Auth::user();
        $organization = $this->organizationService->getOrganization();
        return Inertia::render('Organization/Organization', compact('user', 'organization'));
    }
}

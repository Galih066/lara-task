<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\ProfileService;
use App\Services\DashboardService;

class DashboardController extends Controller
{
    protected $profileService;
    protected $dashboardSvc;

    public function __construct(
        ProfileService $profileService,
        DashboardService $dashboardSvc
    )
    {
        $this->profileService = $profileService;
        $this->dashboardSvc = $dashboardSvc;
    }

    public function index ()
    {
        $loggedUser = Auth::user();
        $user = $this->profileService->getUserWithProfile($loggedUser);
        $summary = $this->dashboardSvc->getDashboardSummary($loggedUser);
        return inertia('Dashboard/Dashboard', compact('user', 'summary'));
    }
}

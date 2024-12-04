<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Services\ProfileService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TaskController extends Controller
{
    protected $profileService;

    public function __construct(ProfileService $profileService)
    {
        $this->profileService = $profileService;
    }

    public function index()
    {
        $loggedUser = Auth::user();
        $user = $this->profileService->getUserWithProfile($loggedUser);
        
        return Inertia::render('Task/Task', [
            'auth' => [
                'user' => $user
            ],
            'users' => \App\Models\User::all()
        ]);
    }
}

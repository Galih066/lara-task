<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Requests\Task\StoreTaskRequest;
use App\Services\ProfileService;
use App\Services\TaskService;

class TaskController extends Controller
{
    protected $profileService;
    protected $taskService;

    public function __construct(ProfileService $profileService, TaskService $taskService)
    {
        $this->profileService = $profileService;
        $this->taskService = $taskService;
    }

    public function index()
    {
        $loggedUser = Auth::user();
        $user = $this->profileService->getUserWithProfile($loggedUser);
        $empOrg = $this->taskService->getOrgEmployees($loggedUser->profile->organization_id);
        
        return Inertia::render('Task/Task', [
            'user' => $user,
            'empOrg' => $empOrg,
        ]);
    }

    public function store(StoreTaskRequest $request)
    {
        try {
            $task = $this->taskService->store($request);

            return response()->json([
                'message' => 'Task created successfully',
                'task' => $task
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error creating task',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}

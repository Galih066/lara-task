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
        $tasks = $this->taskService->getAllTasks();
        
        return Inertia::render('Task/Task', [
            'user' => $user,
            'empOrg' => $empOrg,
            'initialTasks' => $tasks,
        ]);
    }

    public function store(StoreTaskRequest $request)
    {
        $this->taskService->store($request);
        return redirect()->route('task');
    }

    public function show($taskId)
    {
        $task = $this->taskService->getTaskDetail($taskId);
        return response()->json($task);
    }

    public function updateStatus($taskId)
    {
        $status = request()->input('status');
        $task = $this->taskService->updateTaskStatus($taskId, $status);
        return response()->json($task);
    }
}

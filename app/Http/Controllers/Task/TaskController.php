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

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'assignees' => 'required|array',
            'assignees.*' => 'exists:users,id',
            'due_date' => 'required|date',
            'priority' => 'required|in:low,medium,high',
            'status' => 'required|in:todo,in_progress,done',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        try {
            $task = new \App\Models\Task();
            $task->title = $request->title;
            $task->description = $request->description;
            $task->due_date = $request->due_date;
            $task->priority = $request->priority;
            $task->status = $request->status;
            $task->initiator_id = Auth::id();
            $task->save();

            // Save assignees
            $task->assignees()->attach($request->assignees);

            // Handle image uploads
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $path = $image->store('task-images', 'public');
                    $task->images()->create([
                        'path' => $path
                    ]);
                }
            }

            return response()->json([
                'message' => 'Task created successfully',
                'task' => $task->load('assignees', 'images')
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error creating task',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}

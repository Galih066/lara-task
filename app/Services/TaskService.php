<?php

namespace App\Services;

use App\Models\Profile;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class TaskService
{
    public function getOrgEmployees($idOrg)
    {
        return Profile::where('organization_id', $idOrg)
            ->with('user:id,name,email')
            ->get()
            ->map(function ($profile) {
                return [
                    'id' => $profile->user->id,
                    'name' => $profile->user->name,
                    'email' => $profile->user->email,
                    'first_name' => $profile->first_name,
                    'last_name' => $profile->last_name,
                    'phone' => $profile->phone,
                    'birth_date' => $profile->birth_date,
                    'gender' => $profile->gender,
                    'job_title' => $profile->job_title,
                    'join_date' => $profile->join_date,
                    'address' => $profile->address,
                    'city' => $profile->city,
                    'state' => $profile->state,
                    'country' => $profile->country,
                    'postal_code' => $profile->postal_code,
                    'department' => $profile->department
                ];
            });
    }

    public function store($request)
    {
        $task = new Task();
        $task->title = $request->title;
        $task->description = $request->description;
        $task->start_date = $request->start_date;
        $task->due_date = $request->due_date;
        $task->priority = $request->priority;
        $task->status = $request->status;
        $task->initiator = Auth::id();
        $task->assignees = json_encode($request->assignees);
        $task->save();

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('task-images', 'public');
                $task->images()->create([
                    'image_path' => $path,
                    'original_name' => $image->getClientOriginalName(),
                    'mime_type' => $image->getMimeType(),
                    'size' => $image->getSize() ?? 0
                ]);
            }
        }

        return $task;
    }

    public function updateTaskStatus($taskId, $status)
    {
        $task = Task::findOrFail($taskId);
        $task->status = $status;
        $task->save();
        return $task;
    }

    public function getAllTasks()
    {
        $userId = Auth::id();
        $tasks = Task::select('id', 'title', 'description', 'priority', 'status', 'start_date', 'due_date', 'initiator', 'assignees')
            ->where(function($query) use ($userId) {
                $query->whereRaw('JSON_SEARCH(assignees, "one", ?) IS NOT NULL', [$userId])
                      ->orWhere('initiator', $userId);
            })
            ->with('initiatorUser:id,name')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($task) {
                return [
                    'id' => $task->id,
                    'title' => $task->title,
                    'description' => $task->description,
                    'priority' => $task->priority,
                    'status' => $task->status,
                    'initiator' => ucwords(strtolower($task->initiatorUser->name)),
                    'start_date' => $task->start_date,
                    'due_date' => $task->due_date,
                    'assignees' => json_decode($task->assignees)
                ];
            });
        
        return $tasks;
    }

    public function getTaskDetail($taskId)
    {
        $task = Task::with(['initiatorUser:id,name,email', 'images'])
            ->findOrFail($taskId);

        // Get assignee details
        $assigneeIds = json_decode($task->assignees);
        $assignees = Profile::whereIn('user_id', $assigneeIds)
            ->with('user:id,name,email')
            ->get()
            ->map(function ($profile) {
                return [
                    'id' => $profile->user->id,
                    'name' => $profile->user->name,
                    'email' => $profile->user->email,
                    'job_title' => $profile->job_title,
                    'department' => $profile->department,
                ];
            });

        return [
            'id' => $task->id,
            'title' => $task->title,
            'description' => $task->description,
            'priority' => $task->priority,
            'status' => $task->status,
            'initiator' => [
                'id' => $task->initiatorUser->id,
                'name' => $task->initiatorUser->name,
                'email' => $task->initiatorUser->email,
            ],
            'assignees' => $assignees,
            'start_date' => $task->start_date,
            'due_date' => $task->due_date,
            'completedDate' => $task->completed_date,
            'createdAt' => $task->created_at,
            'updatedAt' => $task->updated_at,
            'images' => $task->images->map(function ($image) {
                return [
                    'id' => $image->id,
                    'path' => $image->image_path,
                    'name' => $image->original_name,
                    'size' => $image->size,
                    'type' => $image->mime_type,
                ];
            })
        ];
    }

    public function deleteTask($taskId)
    {
        $task = Task::findOrFail($taskId);
        return $task->delete();
    }
}

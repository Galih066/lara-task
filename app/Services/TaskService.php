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

        return $task->load('assignees', 'images');
    }
}

<?php

namespace App\Services;

use App\Models\Organization;
use App\Models\Profile;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class OrganizationService
{
    public function createOrganization(array $data)
    {
        return Organization::create($data);
    }

    public function getOrganization()
    {
        $profile = Profile::where('user_id', Auth::id())->first();
        $organization = null;
        
        if ($profile) {
            $organization = Organization::find($profile->organization_id);
            if ($organization) {
                $organization->total_members = $this->getTotalMembers($organization->id);
                $organization->total_tasks = $this->getTotalTasks($organization->id);
                $organization->completed_tasks = $this->getCompletedTasks($organization->id);
            }
        }
        
        return $organization;
    }

    private function getTotalMembers($orgId)
    {
        return Profile::where('organization_id', $orgId)->count();
    }

    private function getTotalTasks($orgId)
    {
        $userIds = Profile::where('organization_id', $orgId)
            ->pluck('user_id')
            ->toArray();
            
        return Task::whereIn('initiator', $userIds)->count();
    }

    private function getCompletedTasks($orgId)
    {
        $userIds = Profile::where('organization_id', $orgId)
            ->pluck('user_id')
            ->toArray();
            
        return Task::whereIn('initiator', $userIds)
            ->where('status', 'done')
            ->count();
    }
}
<?php

namespace App\Services;

use App\Models\Profile;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class MemberService
{
    public function getMembers(int $organizationId, $loggedUser)
    {
        $query = Profile::where('organization_id', $organizationId)
            ->where('user_id', '!=', $loggedUser->id);

        if ($loggedUser->role !== 'owner') {
            $query->whereHas('user', function($q) {
                $q->where('role', '!=', 'owner');
            });
        }

        $members = $query->select(
            'id',
            'user_id',
            'first_name',
            'last_name',
            'phone',
            'department',
            'is_active',
            'join_date'
        )
        ->with(['user' => function($query) {
            $query->select('id', 'email', 'role', 'name');
        }])
        ->get()
        ->map(function ($member) {
            return [
                'profileId' => $member->id,
                'userId' => $member->user->id,
                'name' => ($member->first_name != null || $member->last_name != null) 
                    ? trim($member->first_name . ' ' . $member->last_name)
                    : $member->user->name,
                'email' => $member->user->email,
                'role' => $member->user->role,
                'phone' => $member->phone == null ? 'Not set' : $member->phone,
                'department' => $member->department == null ? 'Not set' : $member->department,
                'joinDate' => $member->join_date == null ? 'Not set' : $member->join_date,
                'isActive' => $member->is_active == 1 ? 'Active' : 'Inactive',
            ];
        });

        return $members;
    }

    public function addMember(array $memberData, $loggedUser)
    {
        DB::beginTransaction();
        try {
            $user = User::create([
                "email" => $memberData['email'],
                "name" => $memberData['username'],
                "role" => $memberData['role'],
                "password" => Hash::make(env('DEFAULT_PASSWORD')),
            ]);

            $profile = Profile::create([
                "user_id" => $user->id,
                "organization_id" => $loggedUser->profile->organization_id,
                "department" => $memberData['department'],
                "phone" => $memberData['phone'] ?? null,
                "join_date" => Carbon::now()->format('Y-m-d'),
            ]);

            DB::commit();
            return $user;
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
}
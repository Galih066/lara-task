<?php

namespace App\Services;

use App\Models\Profile;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class MemberService
{
    public function getMembers(int $organizationId)
    {
        $members = Profile::where('organization_id', $organizationId)
            ->select(
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
                $query->select('id', 'email', 'role');
            }])
            ->get()
            ->map(function ($member) {
                return [
                    'profileId' => $member->id,
                    'userId' => $member->user->id,
                    'name' => ($member->first_name != null || $member->last_name != null) 
                        ? trim($member->first_name . ' ' . $member->last_name)
                        : 'Not set',
                    'email' => $member->user->email,
                    'role' => $member->user->role == 'admin' ? 'Admin' : 'Member',
                    'phone' => $member->phone == null ? 'Not set' : $member->phone,
                    'department' => $member->department == null ? 'Not set' : $member->department,
                    'joinDate' => $member->join_date == null ? 'Not set' : $member->join_date,
                    'isActive' => $member->is_active == 1 ? 'Active' : 'Inactive',
                ];
            });

        return $members;
    }

    public function addMember($memberData, $loggedUser)
    {
        DB::beginTransaction();
        try {
            $dataUser = [
                "email" => $memberData->email,
                "name" => $memberData->username,
                "password" => Hash::make(env('DEFAULT_PASSWORD')),
            ];
            $user = User::create($dataUser);
            $dataProfile = [
                "user_id" => $user->id,
                "organization_id" => $loggedUser->profile->organization_id,
                "join_date" => Carbon::now()->format('Y-m-d'),
            ];
            $profile = Profile::create($dataProfile);
            DB::commit();
            return;
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
}
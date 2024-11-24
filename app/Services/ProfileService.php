<?php

namespace App\Services;

use App\Models\Profile;
use App\Models\User;

class ProfileService
{
    public function getUserWithProfile(User $user)
    {
        $profile = $user->profile ?? $this->createProfile($user);
        
        return [
            'user' => $user,
            'profile' => $profile
        ];
    }

    public function updatePersonalInfo(User $user, array $data)
    {
        $profile = $user->profile ?? $this->createProfile($user);
        
        $profile->update([
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'phone' => $data['phone'],
            'birth_date' => $data['birth_date'],
            'gender' => $data['gender'],
        ]);

        return $profile;
    }

    public function updateWorkInfo(User $user, array $data)
    {
        $profile = $user->profile ?? $this->createProfile($user);
        
        $profile->update([
            'job_title' => $data['job_title'],
            'department' => $data['department'],
            'join_date' => $data['join_date'],
        ]);

        return $profile;
    }

    public function updateContactInfo(User $user, array $data)
    {
        $profile = $user->profile ?? $this->createProfile($user);
        
        $profile->update([
            'address' => $data['address'],
            'city' => $data['city'],
            'state' => $data['state'],
            'country' => $data['country'],
            'postal_code' => $data['postal_code'],
        ]);

        return $profile;
    }

    private function createProfile(User $user)
    {
        return Profile::create([
            'user_id' => $user->id,
            'organization_id' => $user->organization_id,
        ]);
    }
}

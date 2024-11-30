<?php

namespace App\Services;

use App\Models\Organization;
use App\Models\User;
use App\Models\Profile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class SignUpService
{
    public function createOrganization(array $data): bool
    {
        $hashedPwd = Hash::make($data['password']);
        
        DB::beginTransaction();
        try {
            $user = User::create([
                'name' => $data['username'],
                'email' => $data['email'],
                'role' => 'owner',
                'password' => $hashedPwd,
            ]);
    
            $org = Organization::create([
                'org_name' => $data['org_name'],
                'user_id' => $user->id,
                'admin_email' => $data['email'],
                'password' => $hashedPwd,
            ]);

            Profile::create([
                'user_id' => $user->id,
                'organization_id' => $org->id,
            ]);
            
            DB::commit();
            return true;
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
}

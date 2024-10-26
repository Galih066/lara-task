<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\OrganizationRequest;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class SignUpController extends Controller
{
    public function signUpOrg ()
    {
        return inertia('Auth/SignUpOrg');
    }

    public function saveOrg (OrganizationRequest $request)
    {
        $hashedPwd = Hash::make($request->password);
        DB::beginTransaction();
        try {
            $user = User::create([
                'name' => $request->username,
                'email' => $request->email,
                'password' => $hashedPwd,
            ]);
    
            Organization::create([
                'org_name' => $request->org_name,
                'user_id' => $user->id,
                'admin_email' => $request->email,
                'password' => $hashedPwd,
            ]);
            
            DB::commit();
            return to_route('sign_up_org_page');
        } catch (\Throwable $th) {
            DB::rollBack();
        }
    }
}

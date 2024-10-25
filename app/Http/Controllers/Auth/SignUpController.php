<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\OrganizationRequest;

class SignUpController extends Controller
{
    public function signUpOrg ()
    {
        return inertia('Auth/SignUpOrg');
    }

    public function saveOrg (OrganizationRequest $request)
    {
        dd($request);
    }
}

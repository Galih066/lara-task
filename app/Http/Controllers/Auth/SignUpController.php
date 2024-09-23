<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SignUpController extends Controller
{
    public function signUpOrg ()
    {
        return inertia('Auth/SignUpOrg');
    }
}

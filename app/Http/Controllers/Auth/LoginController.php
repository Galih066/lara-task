<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;

class LoginController extends Controller
{
    public function index ()
    {
        return inertia('Auth/Login');
    }

    public function login (LoginRequest $request)
    {
        dd($request->all());
    }
}

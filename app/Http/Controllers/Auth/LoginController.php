<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function index ()
    {
        return inertia('Auth/Login');
    }

    public function login (LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');
        $remember = $request->boolean('remember');

        if (Auth::attempt($credentials, $remember)) {
            $request->session()->regenerate();
            return to_route('dashboard_page');
        }

        return back()->withErrors([
            'login' => "We couldn't find an account with these credentials. Please check your email and password, or sign up if you don't have an account yet."
        ])->onlyInput('email');
    }
}

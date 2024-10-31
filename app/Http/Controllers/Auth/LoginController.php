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
        $credentials = $request->all();
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return to_route('dashboard_page');
        }

        return back()->withErrors([
            'login' => 'The provided credentials do not match our records.'
        ])->onlyInput('email');
    }
}

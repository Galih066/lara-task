<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Services\Auth\LoginService;

class LoginController extends Controller
{
    protected $loginService;

    public function __construct(LoginService $loginService)
    {
        $this->loginService = $loginService;
    }

    public function index()
    {
        return inertia('Auth/Login');
    }

    public function login(LoginRequest $request)
    {
        $result = $this->loginService->login($request);

        if ($result['success']) {
            return to_route($result['redirect']);
        }

        return back()->withErrors([
            'login' => $result['error']
        ])->onlyInput('email');
    }
}

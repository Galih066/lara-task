<?php

namespace App\Services\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\LoginRequest;

class LoginService
{
    /**
     * Handle the login process
     *
     * @param LoginRequest $request
     * @return array
     */
    public function login(LoginRequest $request): array
    {
        $credentials = $request->only('email', 'password');
        $remember = $request->boolean('remember');

        if ($this->attempt($credentials, $remember)) {
            $request->session()->regenerate();
            return [
                'success' => true,
                'redirect' => 'dashboard_page'
            ];
        }

        return [
            'success' => false,
            'error' => "We couldn't find an account with these credentials. Please check your email and password, or sign up if you don't have an account yet."
        ];
    }

    /**
     * Attempt to authenticate the user.
     *
     * @param array $credentials
     * @param bool $remember
     * @return bool
     */
    protected function attempt(array $credentials, bool $remember = false): bool
    {
        return Auth::attempt($credentials, $remember);
    }
}

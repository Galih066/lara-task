<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\OrganizationRequest;
use App\Services\SignUpService;

class SignUpController extends Controller
{
    protected $signUpService;

    public function __construct(SignUpService $signUpService)
    {
        $this->signUpService = $signUpService;
    }

    public function signUpOrg()
    {
        return inertia('Auth/SignUpOrg');
    }

    public function saveOrg(OrganizationRequest $request)
    {
        try {
            $this->signUpService->createOrganization($request->validated());
            return to_route('sign_up_org_page');
        } catch (\Throwable $th) {
            return back()->withErrors(['error' => 'Failed to create organization. Please try again.']);
        }
    }
}

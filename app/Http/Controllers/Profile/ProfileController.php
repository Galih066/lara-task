<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Http\Requests\Profile\UpdatePersonalRequest;
use App\Http\Requests\Profile\UpdateWorkRequest;
use App\Http\Requests\Profile\UpdateContactRequest;
use App\Services\ProfileService;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    protected $profileService;

    public function __construct(ProfileService $profileService)
    {
        $this->profileService = $profileService;
    }

    public function index()
    {
        $loggedUser = Auth::user();
        $user = $this->profileService->getUserWithProfile($loggedUser);
        return inertia('Profile/Profile', compact('user'));
    }

    public function updatePersonal(UpdatePersonalRequest $request)
    {
        $user = Auth::user();
        $this->profileService->updatePersonalInfo($user, $request->validated());
        return back()->with('success', 'Personal information updated successfully');
    }

    public function updateWork(UpdateWorkRequest $request)
    {
        $user = Auth::user();
        $this->profileService->updateWorkInfo($user, $request->validated());
        return back()->with('success', 'Work information updated successfully');
    }

    public function updateContact(UpdateContactRequest $request)
    {
        $user = Auth::user();
        $this->profileService->updateContactInfo($user, $request->validated());
        return back()->with('success', 'Contact information updated successfully');
    }
}

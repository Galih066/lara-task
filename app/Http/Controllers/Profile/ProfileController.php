<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Profile;

class ProfileController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $profile = $user->profile;
        return inertia('Profile/Profile', [
            'user' => $user,
            'profile' => $profile
        ]);
    }

    public function updatePersonal(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'birth_date' => 'nullable|date',
            'gender' => 'nullable|string|in:male,female',
        ]);

        $user = Auth::user();
        $profile = $user->profile;
        $profile->update($request->only([
            'first_name',
            'last_name',
            'phone',
            'birth_date',
            'gender'
        ]));

        return back()->with('success', 'Personal information updated successfully');
    }

    public function updateWork(Request $request)
    {
        $request->validate([
            'job_title' => 'nullable|string|max:255',
            'department' => 'nullable|string|max:255',
            'join_date' => 'nullable|date',
        ]);

        $user = Auth::user();
        $profile = $user->profile;
        $profile->update($request->only([
            'job_title',
            'department',
            'join_date'
        ]));

        return back()->with('success', 'Work information updated successfully');
    }

    public function updateContact(Request $request)
    {
        $request->validate([
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'country' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:20',
        ]);

        $user = Auth::user();
        $profile = $user->profile;
        $profile->update($request->only([
            'address',
            'city',
            'state',
            'country',
            'postal_code'
        ]));

        return back()->with('success', 'Contact information updated successfully');
    }
}

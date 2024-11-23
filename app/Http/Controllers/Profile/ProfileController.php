<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class ProfileController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        return inertia('Profile/Profile', compact('user'));
    }

    public function updatePersonal(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore(Auth::id())],
            'phone' => 'nullable|string|max:20',
            'birth_date' => 'nullable|date',
            'gender' => 'nullable|string|in:male,female,other',
        ]);

        $user = Auth::user();
        $user->update($request->only(['name', 'email', 'phone', 'birth_date', 'gender']));

        return back()->with('success', 'Personal information updated successfully');
    }

    public function updateWork(Request $request)
    {
        $request->validate([
            'job_title' => 'nullable|string|max:255',
            'department' => 'nullable|string|max:255',
            'employee_id' => 'nullable|string|max:50',
            'join_date' => 'nullable|date',
        ]);

        $user = Auth::user();
        $user->update($request->only(['job_title', 'department', 'employee_id', 'join_date']));

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
        $user->update($request->only(['address', 'city', 'state', 'country', 'postal_code']));

        return back()->with('success', 'Contact information updated successfully');
    }

    public function updateEmergency(Request $request)
    {
        $request->validate([
            'emergency_contact_name' => 'nullable|string|max:255',
            'emergency_contact_relation' => 'nullable|string|max:100',
            'emergency_contact_phone' => 'nullable|string|max:20',
        ]);

        $user = Auth::user();
        $user->update($request->only([
            'emergency_contact_name',
            'emergency_contact_relation',
            'emergency_contact_phone'
        ]));

        return back()->with('success', 'Emergency contact updated successfully');
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required|current_password',
            'password' => 'required|min:8|confirmed',
        ]);

        $user = Auth::user();
        $user->password = bcrypt($request->password);
        $user->save();

        return back()->with('success', 'Password updated successfully');
    }
}

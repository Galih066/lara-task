<?php

namespace App\Http\Controllers\Organization;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrganizationController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        return Inertia::render('Organization/Organization', compact('user'));
    }
}

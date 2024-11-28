<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\ProfileService;
use App\Services\MemberService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Requests\Member\StoreMemberRequest;

class MemberController extends Controller
{
    protected $profileService;
    protected $memberService;
    
    public function __construct(
        ProfileService $profileService,
        MemberService $memberService
    )
    {
        $this->profileService = $profileService;
        $this->memberService = $memberService;
    }

    public function index()
    {
        $loggedUser = Auth::user();
        $user = $this->profileService->getUserWithProfile($loggedUser);
        $members = $this->memberService->getMembers($user->profile->organization_id);
        
        return Inertia::render('Member/Member', [
            'user' => $user,
            'members' => $members
        ]);
    }

    public function store(StoreMemberRequest $request)
    {
        $loggedUser = Auth::user();
        $user = $this->profileService->getUserWithProfile($loggedUser);
        $validated = $request->validated();
        
        $this->memberService->addMember($validated, $user);
        
        return redirect()->route('member');
    }
}

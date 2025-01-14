<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\SignUpController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Profile\ProfileController;
use App\Http\Controllers\Member\MemberController;
use App\Http\Controllers\Task\TaskController;
use App\Http\Controllers\Organization\OrganizationController;

Route::get('/', [LoginController::class, 'index'])->name('login_page');
Route::get('/signup-org', [SignUpController::class, 'signUpOrg'])->name('sign_up_org_page');
Route::post('/sent-org', [SignUpController::class, 'saveOrg'])->name('submit_org');
Route::post('/sent-login', [LoginController::class, 'login'])->name('submit_login');
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::post('/logout', [LogoutController::class, 'logout'])->name('logout');
    Route::get('/logged-in', [DashboardController::class, 'user'])->name('user_logged_in');
    
    // Profile Routes
    Route::prefix('profile')->group(function () {
        Route::get('/', [ProfileController::class, 'index'])->name('profile');
        Route::post('/update/personal', [ProfileController::class, 'updatePersonal'])->name('profile.update.personal');
        Route::post('/update/work', [ProfileController::class, 'updateWork'])->name('profile.update.work');
        Route::post('/update/contact', [ProfileController::class, 'updateContact'])->name('profile.update.contact');
    });

    // Membership Routes
    Route::prefix('member')->group(function () {
        Route::get('/', [MemberController::class, 'index'])->name('member');
        Route::post('/add-member', [MemberController::class, 'store'])->name('member.store');
    });

    // Organization Routes
    Route::prefix('organization')->group(function () {
        Route::get('/', [OrganizationController::class, 'index'])->name('organization');
    });

    // Task Routes
    Route::prefix('task')->group(function () {
        Route::get('/', [TaskController::class, 'index'])->name('task');
        Route::post('/store', [TaskController::class, 'store'])->name('tasks.store');
        Route::get('/{taskId}', [TaskController::class, 'show'])->name('task.show');
        Route::patch('/{taskId}/status', [TaskController::class, 'updateStatus'])->name('task.updateStatus');
        Route::delete('/{taskId}', [TaskController::class, 'destroy'])->name('task.destroy');
    });
});
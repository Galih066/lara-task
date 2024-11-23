<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\SignUpController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Profile\ProfileController;

Route::get('/', [LoginController::class, 'index'])->name('login_page');
Route::get('/signup-org', [SignUpController::class, 'signUpOrg'])->name('sign_up_org_page');
Route::post('/sent-org', [SignUpController::class, 'saveOrg'])->name('submit_org');
Route::post('/sent-login', [LoginController::class, 'login'])->name('submit_login');
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard_page');
    Route::post('/logout', [LogoutController::class, 'logout'])->name('submit_logout');
    Route::get('/logged-in', [DashboardController::class, 'user'])->name('user_logged_in');
    
    // Profile routes
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile_page');
    Route::post('/profile/update', [ProfileController::class, 'update'])->name('profile_update');
});
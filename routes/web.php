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
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::post('/logout', [LogoutController::class, 'logout'])->name('logout');
    Route::get('/logged-in', [DashboardController::class, 'user'])->name('user_logged_in');
    
    // Profile Routes
    Route::prefix('profile')->group(function () {
        Route::get('/', [ProfileController::class, 'index'])->name('profile');
        Route::post('/update/personal', [ProfileController::class, 'updatePersonal'])->name('profile.update.personal');
        Route::post('/update/work', [ProfileController::class, 'updateWork'])->name('profile.update.work');
        Route::post('/update/contact', [ProfileController::class, 'updateContact'])->name('profile.update.contact');
        Route::post('/update/emergency', [ProfileController::class, 'updateEmergency'])->name('profile.update.emergency');
        Route::post('/update/password', [ProfileController::class, 'updatePassword'])->name('profile.update.password');
    });
});
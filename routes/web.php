<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\SignUpController;
use App\Http\Controllers\Dashboard\DashboardController;

Route::get('/', [LoginController::class, 'index'])->name('login_page');
Route::get('/signup-org', [SignUpController::class, 'signUpOrg'])->name('sign_up_org_page');
Route::post('/sent-org', [SignUpController::class, 'saveOrg'])->name('submit_org');
Route::post('/sent-login', [LoginController::class, 'login'])->name('submit_login');
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard_page');
});
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\SignUpController;

Route::get('/', [LoginController::class, 'index'])->name('login_page');
Route::get('/signup-org', [SignUpController::class, 'signUpOrg'])->name('sign_up_org_page');
Route::post('/sent-org', [SignUpController::class, 'saveOrg'])->name('submit_org');

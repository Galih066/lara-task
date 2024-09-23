<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\SignUpController;

Route::get('/', [LoginController::class, 'index']);
Route::get('/signup-org', [SignUpController::class, 'signUpOrg']);

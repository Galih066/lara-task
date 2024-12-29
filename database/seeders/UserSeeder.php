<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create owner user
        User::create([
            'name' => 'System Owner',
            'email' => 'owner@example.com',
            'role' => 'owner',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'remember_token' => Str::random(10),
        ]);

        // Create admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'role' => 'admin',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'remember_token' => Str::random(10),
        ]);

        // Create some regular users with specific names
        $namedUsers = [
            [
                'name' => 'John Doe',
                'email' => 'john@example.com',
            ],
            [
                'name' => 'Jane Smith',
                'email' => 'jane@example.com',
            ],
            [
                'name' => 'Bob Wilson',
                'email' => 'bob@example.com',
            ],
        ];

        foreach ($namedUsers as $userData) {
            User::create([
                'name' => $userData['name'],
                'email' => $userData['email'],
                'role' => 'user',
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'remember_token' => Str::random(10),
            ]);
        }

        // Create 100 dummy users using factory
        User::factory()->count(100)->create();
    }
}

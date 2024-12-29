<?php

namespace Database\Seeders;

use App\Models\Organization;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create owner user and organization
        $ownerUser = User::create([
            'name' => 'System Owner',
            'email' => 'owner@example.com',
            'role' => 'owner',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'remember_token' => Str::random(10),
        ]);

        $ownerOrg = Organization::create([
            'org_name' => 'System Organization',
            'user_id' => $ownerUser->id,
            'admin_email' => $ownerUser->email,
            'password' => Hash::make('password'),
            'description' => 'Main system organization',
            'industry' => 'Technology',
            'size_category' => '1-10',
            'location' => 'System HQ',
        ]);

        Profile::create([
            'user_id' => $ownerUser->id,
            'organization_id' => $ownerOrg->id,
            'first_name' => 'System',
            'last_name' => 'Owner',
            'job_title' => 'System Administrator',
            'department' => 'Administration',
            'join_date' => now(),
        ]);

        // Create admin user and organization
        $adminUser = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'role' => 'admin',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'remember_token' => Str::random(10),
        ]);

        $adminOrg = Organization::create([
            'org_name' => 'Admin Organization',
            'user_id' => $adminUser->id,
            'admin_email' => $adminUser->email,
            'password' => Hash::make('password'),
            'description' => 'Administrative organization',
            'industry' => 'Technology',
            'size_category' => '11-50',
            'location' => 'Admin HQ',
        ]);

        Profile::create([
            'user_id' => $adminUser->id,
            'organization_id' => $adminOrg->id,
            'first_name' => 'Admin',
            'last_name' => 'User',
            'job_title' => 'Administrator',
            'department' => 'Administration',
            'join_date' => now(),
        ]);

        // Create 10 organizations
        $organizations = [];
        $industries = ['Technology', 'Healthcare', 'Education', 'Finance', 'Manufacturing', 'Retail', 'Services'];
        $sizeCategories = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'];

        for ($i = 0; $i < 10; $i++) {
            // Create an owner for each organization
            $orgOwner = User::factory()->create([
                'role' => 'owner'
            ]);

            $org = Organization::create([
                'org_name' => fake()->company(),
                'user_id' => $orgOwner->id,
                'admin_email' => $orgOwner->email,
                'password' => Hash::make('password'),
                'description' => fake()->paragraph(),
                'industry' => $industries[array_rand($industries)],
                'size_category' => $sizeCategories[array_rand($sizeCategories)],
                'location' => fake()->city() . ', ' . fake()->country(),
            ]);

            Profile::factory()->create([
                'user_id' => $orgOwner->id,
                'organization_id' => $org->id,
            ]);

            $organizations[] = $org;
        }

        // Create 100 regular users and assign them to random organizations
        for ($i = 0; $i < 100; $i++) {
            $user = User::factory()->create();
            $randomOrg = $organizations[array_rand($organizations)];
            
            Profile::factory()->create([
                'user_id' => $user->id,
                'organization_id' => $randomOrg->id,
            ]);
        }
    }
}

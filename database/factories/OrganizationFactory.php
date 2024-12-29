<?php

namespace Database\Factories;

use App\Models\Organization;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class OrganizationFactory extends Factory
{
    protected $model = Organization::class;

    public function definition(): array
    {
        $industries = ['Technology', 'Healthcare', 'Education', 'Finance', 'Manufacturing', 'Retail', 'Services'];
        $sizeCategories = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'];
        
        return [
            'org_name' => fake()->company(),
            'description' => fake()->paragraph(),
            'industry' => fake()->randomElement($industries),
            'size_category' => fake()->randomElement($sizeCategories),
            'location' => fake()->city() . ', ' . fake()->country(),
            'password' => Hash::make('password'), // Default password for all organizations
        ];
    }

    public function configure()
    {
        return $this->afterMaking(function (Organization $organization) {
            // Set admin_email and user_id after making but before creating
        })->afterCreating(function (Organization $organization) {
            // Any after create operations
        });
    }
}

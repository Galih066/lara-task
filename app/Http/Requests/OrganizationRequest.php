<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrganizationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'org_name' => 'required',
            'username' => 'required',
            'email' => 'required',
            'password' => 'required|min:8',
        ];
    }

    public function messages(): array
    {
        return [
            'org_name.required' => 'A Organization Name is required',
            'username.required' => 'A Username is required',
            'email.required' => 'A Email is required',
            'password.required' => 'A Password is required',
            'password:min:8' => 'Minimum password value is 8',
        ];
    }
}

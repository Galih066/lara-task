<?php

namespace App\Http\Requests\Task;

use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'assignees' => 'required|array',
            'assignees.*' => 'exists:users,id',
            'start_date' => 'nullable|date',
            'due_date' => 'nullable|date',
            'priority' => 'required|in:low,medium,high',
            'status' => 'required|in:todo,in_progress,done',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'title.required' => 'The task title is required',
            'title.max' => 'The task title cannot exceed 255 characters',
            'description.required' => 'The task description is required',
            'assignees.required' => 'Please assign at least one member to the task',
            'assignees.*.exists' => 'One or more selected assignees are invalid',
            'due_date.required' => 'The due date is required',
            'due_date.date' => 'Please provide a valid date',
            'priority.required' => 'Task priority is required',
            'priority.in' => 'Priority must be low, medium, or high',
            'status.required' => 'Task status is required',
            'status.in' => 'Status must be todo, in_progress, or done',
            'images.*.image' => 'The uploaded file must be an image',
            'images.*.mimes' => 'The image must be a file of type: jpeg, png, jpg, gif',
            'images.*.max' => 'The image size cannot exceed 2MB'
        ];
    }
}

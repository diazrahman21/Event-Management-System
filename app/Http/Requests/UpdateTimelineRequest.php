<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTimelineRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date_format:Y-m-d\TH:i',
            'status' => 'nullable|in:pending,in_progress,done',
            'order' => 'nullable|integer',
            'assigned_to' => 'nullable|exists:users,id',
        ];
    }
}

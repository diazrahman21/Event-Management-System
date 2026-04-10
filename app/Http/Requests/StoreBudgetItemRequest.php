<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBudgetItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->hasRole('admin');
    }

    public function rules(): array
    {
        return [
            'category' => 'required|string|max:255',
            'description' => 'nullable|string',
            'planned_amount' => 'required|numeric|min:0',
        ];
    }
}

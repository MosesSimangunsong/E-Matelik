<?php

namespace App\Http\Requests\Admin;

use App\Enums\PhotoCapturedFrom;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateReportStatusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->isAdmin() ?? false;
    }

    public function rules(): array
    {
        return [
            'status_id' => ['required', 'integer', Rule::exists('report_statuses', 'id')],
            'note' => ['required', 'string', 'max:2000'],
            'resolution_note' => ['nullable', 'string', 'max:2000'],
            'resolution_photos' => ['nullable', 'array'],
            'resolution_photos.*' => ['required', 'image', 'max:5120'],
            'resolution_photo_sources' => ['nullable', 'array'],
            'resolution_photo_sources.*' => ['nullable', Rule::in(PhotoCapturedFrom::values())],
        ];
    }
}

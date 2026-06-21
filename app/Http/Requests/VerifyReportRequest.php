<?php

namespace App\Http\Requests;

use App\Enums\PhotoCapturedFrom;
use App\Enums\PekasehVerdict;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class VerifyReportRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->isPekaseh() ?? false;
    }

    public function rules(): array
    {
        return [
            'verdict' => ['required', Rule::in(PekasehVerdict::values())],
            'verification_note' => ['required', 'string', 'max:2000'],
            'resolution_photos' => ['nullable', 'array'],
            'resolution_photos.*' => ['required', 'image', 'max:5120'],
            'resolution_photo_sources' => ['nullable', 'array'],
            'resolution_photo_sources.*' => ['nullable', Rule::in(PhotoCapturedFrom::values())],
        ];
    }
}

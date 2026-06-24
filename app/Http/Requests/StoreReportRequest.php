<?php

namespace App\Http\Requests;

use App\Enums\PhotoCapturedFrom;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreReportRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->isPelapor() ?? false;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'category_id' => [
                'required',
                Rule::exists('categories', 'id')->where(fn ($query) => $query->where('is_active', true)),
            ],
            'subak_id' => [
                Rule::requiredIf(! $this->user()?->subak_id),
                'nullable',
                'integer',
                Rule::exists('subaks', 'id'),
            ],
            'description' => ['required', 'string'],
            'latitude' => ['required', 'numeric', 'between:-90,90'],
            'longitude' => ['required', 'numeric', 'between:-180,180'],
            'address_text' => ['nullable', 'string', 'max:1000'],
            'photos' => ['required', 'array', 'min:1'],
            'photos.*' => ['required', 'image', 'max:5120'],
            'photo_sources' => ['nullable', 'array'],
            'photo_sources.*' => ['nullable', Rule::in(PhotoCapturedFrom::values())],
            'patrol_point_id' => ['nullable', 'exists:patrol_points,id'],   
        ];
    }

    public function messages(): array
    {
        return [
            'subak_id.required' => 'Pilih Subak terlebih dahulu sebelum mengirim laporan.',
            'photos.required' => 'Minimal satu foto bukti wajib diunggah.',
            'photos.min' => 'Minimal satu foto bukti wajib diunggah.',
        ];
    }
}

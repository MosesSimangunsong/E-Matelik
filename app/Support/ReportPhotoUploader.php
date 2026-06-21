<?php

namespace App\Support;

use App\Enums\PhotoCapturedFrom;
use App\Enums\ReportPhotoRole;
use App\Models\Report;
use Illuminate\Http\UploadedFile;

class ReportPhotoUploader
{
    /**
     * @param  UploadedFile[]  $photos
     * @param  string[]  $sources
     */
    public function storeMany(
        Report $report,
        array $photos,
        array $sources,
        int $uploadedBy,
        ReportPhotoRole $role,
    ): void {
        foreach (array_values($photos) as $index => $photo) {
            if (! $photo instanceof UploadedFile) {
                continue;
            }

            $photoPath = $photo->store("report-photos/{$report->report_code}", 'public');
            $capturedFrom = $sources[$index] ?? PhotoCapturedFrom::Unknown->value;

            $report->photos()->create([
                'photo_path' => $photoPath,
                'original_name' => $photo->getClientOriginalName(),
                'mime_type' => $photo->getClientMimeType(),
                'file_size' => $photo->getSize(),
                'uploaded_by' => $uploadedBy,
                'photo_role' => $role->value,
                'file_hash' => hash_file('sha256', $photo->getRealPath()),
                'captured_from' => in_array($capturedFrom, PhotoCapturedFrom::values(), true)
                    ? $capturedFrom
                    : PhotoCapturedFrom::Unknown->value,
            ]);
        }
    }
}

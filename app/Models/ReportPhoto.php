<?php

namespace App\Models;

use App\Enums\PhotoCapturedFrom;
use App\Enums\ReportPhotoRole;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReportPhoto extends Model
{
    use HasFactory;

    protected $fillable = [
        'report_id',
        'photo_path',
        'original_name',
        'mime_type',
        'file_size',
        'uploaded_by',
        'photo_role',
        'file_hash',
        'captured_from',
    ];

    protected function casts(): array
    {
        return [
            'photo_role' => ReportPhotoRole::class,
            'captured_from' => PhotoCapturedFrom::class,
        ];
    }

    public function report(): BelongsTo
    {
        return $this->belongsTo(Report::class);
    }

    public function uploader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }
}

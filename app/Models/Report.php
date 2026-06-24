<?php

namespace App\Models;

use App\Enums\PriorityLevel;
use App\Enums\ReportPhotoRole;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Report extends Model
{
    use HasFactory;

    protected $fillable = [
        'report_code',
        'user_id',
        'subak_id',
        'category_id',
        'status_id',
        'verified_by',
        'resolved_by',
        'title',
        'description',
        'latitude',
        'longitude',
        'address_text',
        'priority_level',
        'verification_note',
        'resolution_note',
        'verified_at',
        'resolved_at',
        'submitted_at',
    ];

    protected function casts(): array
    {
        return [
            'latitude' => 'decimal:7',
            'longitude' => 'decimal:7',
            'verified_at' => 'datetime',
            'resolved_at' => 'datetime',
            'submitted_at' => 'datetime',
            'priority_level' => PriorityLevel::class,
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relasi opsional ke titik patroli asal laporan ini dibuat.
     */
    public function patrolPoint(): BelongsTo
    {
        return $this->belongsTo(PatrolPoint::class);
    }
    
    public function patrolLog()
    {
        return $this->hasOne(PatrolLog::class);
    }

    public function subak(): BelongsTo
    {
        return $this->belongsTo(Subak::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function status(): BelongsTo
    {
        return $this->belongsTo(ReportStatus::class, 'status_id');
    }

    public function verifier(): BelongsTo
    {
        return $this->belongsTo(User::class, 'verified_by');
    }

    public function resolver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'resolved_by');
    }

    public function photos(): HasMany
    {
        return $this->hasMany(ReportPhoto::class);
    }

    public function initialPhotos(): HasMany
    {
        return $this->photos()->where('photo_role', ReportPhotoRole::InitialEvidence->value);
    }

    public function resolutionPhotos(): HasMany
    {
        return $this->photos()->where('photo_role', ReportPhotoRole::ResolutionEvidence->value);
    }

    public function histories(): HasMany
    {
        return $this->hasMany(ReportHistory::class);
    }


}

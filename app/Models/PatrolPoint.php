<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class PatrolPoint extends Model
{
    use HasFactory;

    protected $fillable = [
        'subak_id',
        'created_by',
        'point_code',
        'name',
        'point_type',
        'description',
        'latitude',
        'longitude',
        'reference_photo_path',
        'qr_token',
        'patrol_order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'latitude' => 'decimal:7',
        'longitude' => 'decimal:7',
    ];

    /**
     * Boot function dari model untuk hook events.
     */
    protected static function boot()
    {
        parent::boot();

        // Otomatis membuat qr_token unik saat record baru akan disimpan (jika belum ada)
        static::creating(function ($model) {
            if (empty($model->qr_token)) {
                $model->qr_token = Str::random(32);
            }
        });
    }

    /**
     * Relasi ke Subak tempat titik ini berada.
     */
    public function subak(): BelongsTo
    {
        return $this->belongsTo(Subak::class);
    }

    /**
     * Relasi ke User (Pekaseh) yang membuat titik ini.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Relasi ke log hasil scan patroli pada titik ini.
     */
    public function logs(): HasMany
    {
        return $this->hasMany(PatrolLog::class);
    }

    /**
     * Relasi ke laporan gangguan yang dibuat dari titik ini.
     */
    public function reports(): HasMany
    {
        return $this->hasMany(Report::class);
    }
}
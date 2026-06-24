<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PatrolLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'patrol_point_id',
        'user_id',
        'subak_id',
        'patrol_date',
        'scanned_at',
        'gps_latitude',
        'gps_longitude',
        'inspection_photo_path',
        'inspection_note',
        'status',
    ];

    protected $casts = [
        'patrol_date' => 'date',
        'scanned_at' => 'datetime',
        'gps_latitude' => 'decimal:7',
        'gps_longitude' => 'decimal:7',
    ];

    /**
     * Relasi ke titik patroli yang dipindai.
     */
    public function patrolPoint(): BelongsTo
    {
        return $this->belongsTo(PatrolPoint::class);
    }

    /**
     * Relasi ke User (Matelik) yang melakukan scan.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relasi ke Subak tempat titik ini berada.
     */
    public function subak(): BelongsTo
    {
        return $this->belongsTo(Subak::class);
    }
}
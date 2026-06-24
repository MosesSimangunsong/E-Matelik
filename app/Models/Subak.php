<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Subak extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'region',
        'village',
        'district',
        'description',
    ];

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function reports(): HasMany
    {
        return $this->hasMany(Report::class);
    }

    /**
     * Relasi ke titik-titik patroli di wilayah Subak ini.
     */
    public function patrolPoints(): HasMany
    {
        return $this->hasMany(PatrolPoint::class);
    }

    /**
     * Relasi ke log hasil patroli di wilayah Subak ini.
     */
    public function patrolLogs(): HasMany
    {
        return $this->hasMany(PatrolLog::class);
    }
}

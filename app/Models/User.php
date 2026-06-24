<?php

namespace App\Models;

use App\Enums\RoleSlug;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    protected $fillable = [
        'role_id',
        'subak_id',
        'name',
        'email',
        'password',
        'phone',
        'is_active',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'is_active' => 'boolean',
            'password' => 'hashed',
        ];
    }

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    public function subak(): BelongsTo
    {
        return $this->belongsTo(Subak::class);
    }

    public function reports(): HasMany
    {
        return $this->hasMany(Report::class);
    }

    public function verifiedReports(): HasMany
    {
        return $this->hasMany(Report::class, 'verified_by');
    }

    public function uploadedPhotos(): HasMany
    {
        return $this->hasMany(ReportPhoto::class, 'uploaded_by');
    }

    public function reportHistories(): HasMany
    {
        return $this->hasMany(ReportHistory::class);
    }

    public function hasRole(RoleSlug $role): bool
    {
        return $this->role?->slug === $role->value;
    }

    public function isAdmin(): bool
    {
        return $this->hasRole(RoleSlug::Admin);
    }

    public function isPekaseh(): bool
    {
        return $this->hasRole(RoleSlug::Pekaseh);
    }

    public function isPelapor(): bool
    {
        return $this->hasRole(RoleSlug::Pelapor);
    }

    /**
     * Relasi ke log hasil patroli yang dilakukan oleh user (Matelik) ini.
     */
    public function patrolLogs(): HasMany
    {
        return $this->hasMany(PatrolLog::class);
    }
}

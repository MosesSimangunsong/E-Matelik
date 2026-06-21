<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ReportStatus extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
    ];

    public function reports(): HasMany
    {
        return $this->hasMany(Report::class, 'status_id');
    }

    public function historiesFrom(): HasMany
    {
        return $this->hasMany(ReportHistory::class, 'from_status_id');
    }

    public function historiesTo(): HasMany
    {
        return $this->hasMany(ReportHistory::class, 'to_status_id');
    }
}

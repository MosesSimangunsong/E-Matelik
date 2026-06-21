<?php

namespace App\Enums;

enum ReportStatusSlug: string
{
    case PendingVerification = 'menunggu-verifikasi';
    case Verified = 'diverifikasi';
    case NeedsClarification = 'perlu-klarifikasi';
    case Escalated = 'diekskalasi';
    case InProgress = 'diproses';
    case Completed = 'selesai';
    case Rejected = 'ditolak';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}

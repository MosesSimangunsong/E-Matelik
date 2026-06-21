<?php

namespace App\Enums;

enum PekasehVerdict: string
{
    case Valid = 'valid';
    case NeedsClarification = 'perlu_klarifikasi';
    case Escalate = 'eskalasi';
    case CompletedInternal = 'selesai_internal';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public function action(): string
    {
        return match ($this) {
            self::Valid => 'verified',
            self::NeedsClarification => 'clarification_requested',
            self::Escalate => 'escalated',
            self::CompletedInternal => 'completed_internal',
        };
    }

    public function targetStatusSlug(): ReportStatusSlug
    {
        return match ($this) {
            self::Valid => ReportStatusSlug::Verified,
            self::NeedsClarification => ReportStatusSlug::NeedsClarification,
            self::Escalate => ReportStatusSlug::Escalated,
            self::CompletedInternal => ReportStatusSlug::Completed,
        };
    }
}

<?php

namespace App\Enums;

enum ReportPhotoRole: string
{
    case InitialEvidence = 'initial_evidence';
    case ResolutionEvidence = 'resolution_evidence';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}

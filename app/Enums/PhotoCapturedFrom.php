<?php

namespace App\Enums;

enum PhotoCapturedFrom: string
{
    case Camera = 'camera';
    case Gallery = 'gallery';
    case Unknown = 'unknown';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}

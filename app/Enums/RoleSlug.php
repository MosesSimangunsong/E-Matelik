<?php

namespace App\Enums;

enum RoleSlug: string
{
    case Pelapor = 'pelapor';
    case Pekaseh = 'pekaseh';
    case Admin = 'admin';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}

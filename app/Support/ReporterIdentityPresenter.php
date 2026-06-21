<?php

namespace App\Support;

use App\Models\User;

class ReporterIdentityPresenter
{
    public function forPrivileged(?User $reporter): array
    {
        if (! $reporter) {
            return $this->fallback();
        }

        return [
            'display_name' => $reporter->name,
            'display_email' => $reporter->email,
            'label' => 'Pelapor terverifikasi',
            'scope' => 'full',
            'is_masked' => false,
        ];
    }

    public function forRestricted(?User $reporter): array
    {
        if (! $reporter) {
            return $this->fallback();
        }

        return [
            'display_name' => $this->maskName($reporter->name),
            'display_email' => null,
            'label' => 'Pelapor terverifikasi',
            'scope' => 'masked',
            'is_masked' => true,
        ];
    }

    private function fallback(): array
    {
        return [
            'display_name' => 'Pelapor terverifikasi',
            'display_email' => null,
            'label' => 'Pelapor terverifikasi',
            'scope' => 'masked',
            'is_masked' => true,
        ];
    }

    private function maskName(string $name): string
    {
        $trimmed = trim($name);

        if ($trimmed === '') {
            return 'Pelapor terverifikasi';
        }

        $segments = preg_split('/\s+/', $trimmed) ?: [$trimmed];

        return collect($segments)
            ->map(function (string $segment) {
                $first = mb_substr($segment, 0, 1);

                return mb_strlen($segment) <= 1
                    ? $first.'*'
                    : $first.str_repeat('*', max(mb_strlen($segment) - 1, 1));
            })
            ->implode(' ');
    }
}

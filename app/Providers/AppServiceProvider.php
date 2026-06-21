<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        RateLimiter::for('report-submissions', function (Request $request) {
            $user = $request->user();
            $key = $user?->id
                ? 'report-submissions:'.$user->id
                : 'report-submissions:'.$request->ip();

            return [
                Limit::perMinutes(10, 5)->by($key),
            ];
        });

        Vite::prefetch(concurrency: 3);
    }
}

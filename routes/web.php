<?php

use App\Http\Controllers\Admin\AdminReportController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\HistoryController;
use App\Http\Controllers\Admin\UserManagementController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MapController;
use App\Http\Controllers\Pekaseh\VerificationController;
use App\Http\Controllers\Pekaseh\PatrolPointController; 
use App\Http\Controllers\Pelapor\ReportController;
use App\Http\Controllers\Pelapor\PatrolController; 
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Evidence\EvidenceCapsuleController; 
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Rute Publik untuk Kapsul Bukti Administratif (Tanpa Middleware Auth)
Route::get('/kapsul-bukti/{report:report_code}', [EvidenceCapsuleController::class, 'show'])->name('evidence.capsule');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'redirect'])->name('dashboard');
    Route::get('/map', [MapController::class, 'index'])->name('map.index');

    // Kembalikan rute dashboard admin dan pekaseh seperti aslinya
    Route::get('/pekaseh/dashboard', [DashboardController::class, 'pekaseh'])
        ->middleware('role:pekaseh')
        ->name('pekaseh.dashboard');
    Route::get('/admin/dashboard', [DashboardController::class, 'admin'])
        ->middleware('role:admin')
        ->name('admin.dashboard');
});

// ==========================================
// RUTE KHUSUS PELAPOR (MATELIK / KRAMA)
// ==========================================
Route::middleware(['auth', 'role:pelapor'])->group(function () {
    // 1. Dashboard utama Pelapor sekarang adalah Checklist Patroli Harian
    Route::get('/pelapor/dashboard', [PatrolController::class, 'dashboard'])->name('pelapor.dashboard');

    // Rute Laporan Manual (Kembali menggunakan nama asli)
    Route::get('/reports/create', [ReportController::class, 'create'])->name('reports.create');
    Route::post('/reports', [ReportController::class, 'store'])
        ->middleware('throttle:report-submissions')
        ->name('reports.store');
    Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');
    Route::get('/reports/{report}', [ReportController::class, 'show'])->name('reports.show');

    // 2. Rute operasional Scan QR Patroli
    Route::get('/pelapor/patrol/scan/{qr_token}', [PatrolController::class, 'scanPage'])->name('pelapor.patrol.scan.page');
    Route::post('/pelapor/patrol/scan/{patrolPoint}', [PatrolController::class, 'storeScan'])->name('pelapor.patrol.scan.store');
});

// ==========================================
// RUTE KHUSUS PEKASEH
// ==========================================
Route::middleware(['auth', 'role:pekaseh'])->group(function () {
    // Rute Verifikasi (Kembali menggunakan nama asli agar dashboard lama tidak error)
    Route::get('/verification', [VerificationController::class, 'index'])->name('verification.index');
    Route::get('/verification/{report}', [VerificationController::class, 'show'])->name('verification.show');
    Route::patch('/verification/{report}', [VerificationController::class, 'update'])->name('verification.update');

    // Rute Baru untuk Pekaseh Mengelola Titik Patroli
    Route::resource('/pekaseh/patrol-points', PatrolPointController::class)
        ->except(['show'])
        ->names('pekaseh.patrol-points');
});

// ==========================================
// RUTE KHUSUS ADMIN (DINAS)
// ==========================================
Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin/reports', [AdminReportController::class, 'index'])->name('admin.reports.index');
    Route::get('/admin/reports/{report}', [AdminReportController::class, 'show'])->name('admin.reports.show');
    Route::patch('/admin/reports/{report}/status', [AdminReportController::class, 'updateStatus'])->name('admin.reports.update-status');
    Route::get('/admin/categories', [CategoryController::class, 'index'])->name('admin.categories.index');
    Route::post('/admin/categories', [CategoryController::class, 'store'])->name('admin.categories.store');
    Route::patch('/admin/categories/{category}', [CategoryController::class, 'update'])->name('admin.categories.update');
    Route::get('/admin/users', [UserManagementController::class, 'index'])->name('admin.users.index');
    Route::post('/admin/users', [UserManagementController::class, 'store'])->name('admin.users.store');
    Route::patch('/admin/users/{managedUser}', [UserManagementController::class, 'update'])->name('admin.users.update');
    Route::get('/admin/history', [HistoryController::class, 'index'])->name('admin.history.index');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
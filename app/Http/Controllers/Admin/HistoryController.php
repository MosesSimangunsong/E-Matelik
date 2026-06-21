<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ReportHistory;
use Inertia\Inertia;
use Inertia\Response;

class HistoryController extends Controller
{
    public function index(): Response
    {
        $histories = ReportHistory::query()
            ->with(['report:id,report_code,title', 'user:id,name', 'fromStatus:id,name', 'toStatus:id,name'])
            ->latest()
            ->get()
            ->map(fn (ReportHistory $history) => [
                'id' => $history->id,
                'created_at' => optional($history->created_at)->format('d M Y H:i'),
                'report_code' => $history->report?->report_code,
                'report_title' => $history->report?->title,
                'actor' => $history->user?->name,
                'action' => $history->action,
                'from_status' => $history->fromStatus?->name,
                'to_status' => $history->toStatus?->name,
                'note' => $history->note,
            ]);

        return Inertia::render('Admin/History/Index', [
            'histories' => $histories,
        ]);
    }
}

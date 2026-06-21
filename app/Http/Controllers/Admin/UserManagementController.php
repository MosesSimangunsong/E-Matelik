<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreUserRequest;
use App\Models\Role;
use App\Models\Subak;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class UserManagementController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Users/Index', [
            'users' => User::query()
                ->with(['role:id,name,slug', 'subak:id,name,region'])
                ->orderBy('name')
                ->get()
                ->map(fn (User $user) => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone,
                    'is_active' => $user->is_active,
                    'role' => $user->role ? [
                        'id' => $user->role->id,
                        'name' => $user->role->name,
                        'slug' => $user->role->slug,
                    ] : null,
                    'subak' => $user->subak ? [
                        'id' => $user->subak->id,
                        'name' => $user->subak->name,
                        'region' => $user->subak->region,
                    ] : null,
                ]),
            'roles' => Role::query()->orderBy('id')->get(['id', 'name', 'slug']),
            'subaks' => Subak::query()->orderBy('name')->get(['id', 'name', 'region']),
        ]);
    }

    public function store(StoreUserRequest $request): RedirectResponse
    {
        User::query()->create($request->validated());

        return redirect()->route('admin.users.index')->with('success', 'User berhasil ditambahkan.');
    }

    public function update(StoreUserRequest $request, User $managedUser): RedirectResponse
    {
        $data = $request->validated();

        if (empty($data['password'])) {
            unset($data['password']);
        }

        $managedUser->update($data);

        return redirect()->route('admin.users.index')->with('success', 'User berhasil diperbarui.');
    }
}

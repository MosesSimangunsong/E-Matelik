<?php

namespace App\Http\Controllers\Auth;

use App\Enums\RoleSlug;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterUserRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws ValidationException
     */
    public function store(RegisterUserRequest $request): RedirectResponse
    {
        $pelaporRoleId = Role::query()->firstOrCreate(
            ['slug' => RoleSlug::Pelapor->value],
            [
                'name' => 'Pelapor',
                'description' => 'Pelapor lapangan yang membuat laporan gangguan telabah.',
            ],
        )->id;

        $user = User::create([
            'role_id' => $pelaporRoleId,
            'subak_id' => null,
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'is_active' => true,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}

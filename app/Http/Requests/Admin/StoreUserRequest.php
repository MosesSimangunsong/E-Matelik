<?php

namespace App\Http\Requests\Admin;

use App\Enums\RoleSlug;
use App\Models\Role;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->isAdmin() ?? false;
    }

    public function rules(): array
    {
        $userId = $this->route('managedUser')?->id;
        $passwordRules = $userId
            ? ['nullable', 'string', 'min:8']
            : ['required', 'string', 'min:8'];

        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($userId)],
            'phone' => ['nullable', 'string', 'max:255'],
            'role_id' => ['required', 'integer', Rule::exists('roles', 'id')],
            'subak_id' => ['nullable', 'integer', Rule::exists('subaks', 'id')],
            'is_active' => ['required', 'boolean'],
            'password' => $passwordRules,
        ];
    }

    public function after(): array
    {
        return [
            function ($validator) {
                $roleId = $this->input('role_id');

                if (! $roleId) {
                    return;
                }

                $role = Role::query()->find($roleId);

                if (! $role) {
                    return;
                }

                $requiresSubak = in_array($role->slug, [
                    RoleSlug::Pelapor->value,
                    RoleSlug::Pekaseh->value,
                ], true);

                if ($requiresSubak && ! $this->filled('subak_id')) {
                    $validator->errors()->add('subak_id', 'Role ini wajib terhubung ke Subak.');
                }
            },
        ];
    }
}

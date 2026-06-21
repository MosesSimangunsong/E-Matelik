import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const roleSlug = user?.role?.slug;
    const menuItems =
        roleSlug === 'pelapor'
            ? [
                  { label: 'Dashboard', href: route('pelapor.dashboard'), active: route().current('pelapor.dashboard') },
                  { label: 'Buat Laporan', href: route('reports.create'), active: route().current('reports.create') },
                  { label: 'Laporan Saya', href: route('reports.index'), active: route().current('reports.index') || route().current('reports.show') },
                  { label: 'Peta', href: route('map.index'), active: route().current('map.index') },
              ]
            : roleSlug === 'pekaseh'
              ? [
                    { label: 'Dashboard', href: route('pekaseh.dashboard'), active: route().current('pekaseh.dashboard') },
                    {
                        label: 'Verifikasi Laporan',
                        href: route('verification.index'),
                        active: route().current('verification.index') || route().current('verification.show'),
                    },
                    { label: 'Peta', href: route('map.index'), active: route().current('map.index') },
                ]
            : [
                  {
                      label: 'Dashboard',
                      href:
                          roleSlug === 'admin'
                              ? route('admin.dashboard')
                              : route('pekaseh.dashboard'),
                      active: route().current('admin.dashboard'),
                  },
                  {
                      label: 'Semua Laporan',
                      href: route('admin.reports.index'),
                      active: route().current('admin.reports.index') || route().current('admin.reports.show'),
                  },
                  {
                      label: 'Kategori',
                      href: route('admin.categories.index'),
                      active: route().current('admin.categories.index'),
                  },
                  {
                      label: 'User',
                      href: route('admin.users.index'),
                      active: route().current('admin.users.index'),
                  },
                  {
                      label: 'Histori',
                      href: route('admin.history.index'),
                      active: route().current('admin.history.index'),
                  },
                  {
                      label: 'Peta',
                      href: route('map.index'),
                      active: route().current('map.index'),
                  },
              ];
    const dashboardHref =
        roleSlug === 'admin'
            ? route('admin.dashboard')
            : roleSlug === 'pekaseh'
              ? route('pekaseh.dashboard')
              : route('pelapor.dashboard');

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="app-shell">
            <nav className="sticky top-0 z-30 border-b border-neutral-200 bg-white/85 backdrop-blur">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href={dashboardHref} className="flex items-center gap-3">
                                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-500 text-white shadow-panel">
                                        <ApplicationLogo className="block h-6 w-6 fill-current" />
                                    </span>
                                    <div className="hidden sm:block">
                                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary-600">
                                            E-Matelik
                                        </p>
                                        <p className="text-xs text-neutral-500">
                                            {user.role?.name ?? 'Pengguna'}
                                        </p>
                                    </div>
                                </Link>
                            </div>

                            <div className="hidden items-center space-x-3 sm:ms-10 sm:flex">
                                {menuItems.map((item) => (
                                    <NavLink
                                        key={item.label}
                                        href={item.href}
                                        active={item.active}
                                    >
                                        {item.label}
                                    </NavLink>
                                ))}
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm font-semibold leading-4 text-neutral-700 transition duration-150 ease-in-out hover:border-neutral-300 hover:bg-white focus:outline-none"
                                            >
                                                {user.name}
                                                {user.role?.name ? ` (${user.role.name})` : ''}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden'
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        {menuItems.map((item) => (
                            <ResponsiveNavLink
                                key={item.label}
                                href={item.href}
                                active={item.active}
                            >
                                {item.label}
                            </ResponsiveNavLink>
                        ))}
                    </div>

                    <div className="border-t border-neutral-200 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-semibold text-neutral-900">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-neutral-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="border-b border-neutral-200/80 bg-white/70 backdrop-blur">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="pb-12">{children}</main>
        </div>
    );
}

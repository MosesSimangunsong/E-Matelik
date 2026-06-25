import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="public-shell flex min-h-screen items-center justify-center px-4 py-8 sm:px-6">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-[14%] top-[12%] h-40 w-40 rounded-full bg-primary-500/6 blur-3xl" />
                <div className="absolute bottom-[10%] right-[12%] h-52 w-52 rounded-full bg-secondary-500/8 blur-3xl" />
            </div>

            <div className="relative w-full max-w-md">
                <div className="mb-5 flex items-center justify-center gap-3">
                    <Link href="/" className="flex items-center gap-3">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/80 bg-white/90 shadow-[0_10px_24px_rgba(37,36,31,0.06)]">
                            <ApplicationLogo className="h-8 w-8 object-contain" />
                        </span>
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600">
                                E-Matelik
                            </p>
                            <p className="text-xs text-neutral-500">Sistem internal pemantauan telabah</p>
                        </div>
                    </Link>
                </div>

                <div className="public-surface px-6 py-7 sm:px-8 sm:py-8">
                    {children}
                </div>
            </div>
        </div>
    );
}

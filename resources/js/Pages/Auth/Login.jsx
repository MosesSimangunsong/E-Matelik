import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Masuk" />

            {status && (
                <div className="mb-6 rounded-soft border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                    {status}
                </div>
            )}

            <div className="mb-8 space-y-3">
                <p className="eyebrow">Masuk ke sistem</p>
                <h1 className="page-title">Akses dashboard E-Matelik</h1>
                <p className="body-copy">
                    Gunakan akun Anda untuk membuka pelaporan, verifikasi, dan pemantauan sesuai
                    peran. Form ini dibuat lebih lega agar nyaman diisi dari HP.
                </p>
            </div>

            <form onSubmit={submit}>
                <div className="space-y-5">
                    <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div>
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="block">
                    <label className="flex items-center gap-3">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="text-sm text-neutral-600">
                            Tetap masuk di perangkat ini
                        </span>
                    </label>
                    </div>

                    <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm font-medium text-secondary-700 underline decoration-secondary-200 underline-offset-4 hover:text-secondary-600 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2"
                        >
                            Lupa password?
                        </Link>
                    )}

                    <PrimaryButton className="w-full justify-center sm:w-auto" disabled={processing}>
                        Masuk
                    </PrimaryButton>
                    </div>
                </div>
            </form>

            <div className="mt-6 rounded-card border border-neutral-200 bg-neutral-50 px-4 py-4 text-sm leading-7 text-neutral-600">
                Gunakan email dan password yang terdaftar. Jika Anda pengguna lapangan, akun tetap
                bisa dipakai dengan nyaman dari layar HP maupun tablet.
            </div>
        </GuestLayout>
    );
}

import ApplicationLogo from '@/Components/ApplicationLogo';
import {
    fadeInUp,
    scaleIn,
    staggerContainer,
    staggerItem,
} from '@/lib/motionPresets';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion, useReducedMotion } from 'motion/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });
    const shouldReduceMotion = useReducedMotion();

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    const animateOnLoad = shouldReduceMotion
        ? {}
        : { initial: 'hidden', animate: 'visible' };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f6f3eb] px-6 py-10 font-sans selection:bg-[#4F8A3F] selection:text-white">
            <Head title="Masuk - E-Matelik" />

            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-[12%] top-[12%] h-44 w-44 rounded-full bg-primary-500/8 blur-3xl" />
                <div className="absolute bottom-[14%] right-[14%] h-52 w-52 rounded-full bg-secondary-500/10 blur-3xl" />
                <div className="absolute inset-x-0 top-0 h-64 bg-[linear-gradient(180deg,rgba(255,255,255,0.35),transparent)]" />
            </div>

            <motion.div
                className="relative w-full max-w-md"
                variants={scaleIn}
                {...animateOnLoad}
            >
                <div className="public-surface overflow-hidden border border-white/80 px-7 py-8 shadow-[0_28px_80px_rgba(37,36,31,0.09)] sm:px-8 sm:py-9">
                    <motion.div className="mb-8 text-center" variants={staggerContainer} {...animateOnLoad}>
                        <motion.div variants={staggerItem} className="mb-6 flex justify-center">
                            <Link
                                href={route('home')}
                                className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/80 bg-white/90 shadow-[0_10px_24px_rgba(37,36,31,0.06)]"
                            >
                                <ApplicationLogo className="h-9 w-9 object-contain" />
                            </Link>
                        </motion.div>

                        <motion.p variants={staggerItem} className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-600">
                            E-Matelik
                        </motion.p>
                        <motion.h1 variants={staggerItem} className="mt-4 text-[1.85rem] font-semibold tracking-tight text-neutral-900">
                            Masuk
                        </motion.h1>
                        <motion.p variants={staggerItem} className="mx-auto mt-3 max-w-sm text-sm leading-7 text-neutral-500">
                            Masuk ke sistem internal pemantauan telabah Subak.
                        </motion.p>
                    </motion.div>

                    {status && (
                        <motion.div
                            variants={fadeInUp}
                            {...animateOnLoad}
                            className="mb-5 rounded-2xl border border-success/20 bg-success/10 px-4 py-3 text-sm font-medium text-success"
                        >
                            {status}
                        </motion.div>
                    )}

                    <motion.form
                        onSubmit={submit}
                        className="space-y-5"
                        variants={staggerContainer}
                        {...animateOnLoad}
                    >
                        <motion.div variants={staggerItem}>
                            <label htmlFor="email" className="mb-2 block text-[13px] font-medium text-neutral-700">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="block w-full rounded-[14px] border-neutral-200 bg-white/95 px-4 py-3 text-sm shadow-sm transition-all duration-200 ease-matelik focus:border-primary-500 focus:ring-primary-500"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            {errors.email && (
                                <motion.p
                                    variants={fadeInUp}
                                    {...animateOnLoad}
                                    className="mt-2 text-xs text-danger"
                                >
                                    {errors.email}
                                </motion.p>
                            )}
                        </motion.div>

                        <motion.div variants={staggerItem}>
                            <div className="mb-2 flex items-center justify-between">
                                <label htmlFor="password" className="block text-[13px] font-medium text-neutral-700">
                                    Kata sandi
                                </label>
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-[12px] text-neutral-500 transition-colors duration-200 hover:text-primary-600"
                                    >
                                        Lupa sandi?
                                    </Link>
                                )}
                            </div>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="block w-full rounded-[14px] border-neutral-200 bg-white/95 px-4 py-3 text-sm shadow-sm transition-all duration-200 ease-matelik focus:border-primary-500 focus:ring-primary-500"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            {errors.password && (
                                <motion.p
                                    variants={fadeInUp}
                                    {...animateOnLoad}
                                    className="mt-2 text-xs text-danger"
                                >
                                    {errors.password}
                                </motion.p>
                            )}
                        </motion.div>

                        <motion.div variants={staggerItem} className="flex items-center justify-between pt-1">
                            <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-600">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="rounded border-neutral-300 text-primary-500 shadow-sm focus:ring-primary-500"
                                />
                                Ingat saya
                            </label>
                        </motion.div>

                        <motion.div variants={staggerItem} className="pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className={`inline-flex w-full items-center justify-center rounded-[14px] bg-primary-500 px-4 py-3 text-sm font-semibold text-white transition duration-200 ease-matelik hover:-translate-y-0.5 hover:bg-primary-600 active:translate-y-0 ${
                                    processing ? 'cursor-not-allowed opacity-75' : ''
                                }`}
                            >
                                {processing ? 'Memproses...' : 'Masuk'}
                            </button>
                        </motion.div>
                    </motion.form>

                    <div className="mt-8 border-t border-neutral-200/80 pt-5">
                        <p className="text-center text-xs leading-6 text-neutral-500">
                            Digunakan untuk pelaporan, verifikasi Pekaseh, dan tracking administratif awal.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

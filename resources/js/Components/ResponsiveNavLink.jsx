import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start rounded-soft px-4 py-3 ${
                active
                    ? 'bg-primary-500 text-white'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
            } text-base font-semibold transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}

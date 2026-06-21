import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'bg-primary-500 text-white shadow-panel'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900') +
                className
            }
        >
            {children}
        </Link>
    );
}

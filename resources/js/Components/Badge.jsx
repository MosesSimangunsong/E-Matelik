const variants = {
    default: 'bg-neutral-100 text-neutral-700',
    success: 'bg-emerald-100 text-emerald-700',
    info: 'bg-sky-100 text-sky-700',
    warning: 'bg-amber-100 text-amber-700',
    danger: 'bg-rose-100 text-rose-700',
};

export default function Badge({
    variant = 'default',
    className = '',
    children,
}) {
    return (
        <span className={`status-badge ${variants[variant] ?? variants.default} ${className}`}>
            {children}
        </span>
    );
}

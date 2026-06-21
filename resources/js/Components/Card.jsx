export default function Card({
    as: Component = 'div',
    className = '',
    muted = false,
    children,
    ...props
}) {
    return (
        <Component
            {...props}
            className={`${muted ? 'app-card-muted' : 'app-card'} ${className}`}
        >
            {children}
        </Component>
    );
}

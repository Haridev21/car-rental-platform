import PropTypes from 'prop-types'

/**
 * Skeleton loading component with various variants
 */
export function Skeleton({
    variant = 'text',
    width,
    height,
    className = '',
    count = 1,
    circle = false
}) {
    const baseClasses = 'animate-pulse bg-slate-200 dark:bg-slate-700 rounded'

    const variantStyles = {
        text: { height: '1em', width: '100%', borderRadius: '0.25rem' },
        title: { height: '1.5em', width: '60%', borderRadius: '0.25rem' },
        avatar: { height: '2.5rem', width: '2.5rem', borderRadius: '50%' },
        thumbnail: { height: '4rem', width: '4rem', borderRadius: '0.5rem' },
        image: { height: '12rem', width: '100%', borderRadius: '0.75rem' },
        card: { height: '20rem', width: '100%', borderRadius: '1rem' },
        button: { height: '2.5rem', width: '6rem', borderRadius: '0.75rem' }
    }

    const style = {
        ...(variantStyles[variant] || {}),
        ...(width && { width }),
        ...(height && { height }),
        ...(circle && { borderRadius: '50%' })
    }

    const skeletons = Array.from({ length: count }, (_, i) => (
        <div key={i} className={`${baseClasses} ${className}`} style={style} />
    ))

    if (count === 1) return skeletons[0]

    return <div className="space-y-2">{skeletons}</div>
}

Skeleton.propTypes = {
    variant: PropTypes.oneOf(['text', 'title', 'avatar', 'thumbnail', 'image', 'card', 'button']),
    width: PropTypes.string,
    height: PropTypes.string,
    className: PropTypes.string,
    count: PropTypes.number,
    circle: PropTypes.bool
}

/**
 * Car card skeleton
 */
export function CarCardSkeleton() {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-card">
            <Skeleton variant="image" height="12rem" />
            <div className="p-4 space-y-3">
                <Skeleton variant="title" />
                <div className="flex gap-2">
                    <Skeleton variant="button" width="4rem" height="1.5rem" />
                    <Skeleton variant="button" width="4rem" height="1.5rem" />
                </div>
                <Skeleton variant="text" width="80%" />
                <div className="flex justify-between items-center pt-2">
                    <Skeleton variant="text" width="5rem" />
                    <Skeleton variant="button" />
                </div>
            </div>
        </div>
    )
}

/**
 * Review skeleton
 */
export function ReviewSkeleton() {
    return (
        <div className="flex gap-4 p-4">
            <Skeleton variant="avatar" />
            <div className="flex-1 space-y-2">
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" count={2} />
                <Skeleton variant="text" width="20%" />
            </div>
        </div>
    )
}

/**
 * Page skeleton
 */
export function PageSkeleton() {
    return (
        <div className="space-y-6 p-6">
            <Skeleton variant="title" width="30%" height="2rem" />
            <Skeleton variant="text" count={3} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <CarCardSkeleton />
                <CarCardSkeleton />
                <CarCardSkeleton />
            </div>
        </div>
    )
}

export default Skeleton

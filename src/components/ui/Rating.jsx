import PropTypes from 'prop-types'

/**
 * Rating stars component - display and interactive
 */
export function Rating({
    value = 0,
    max = 5,
    size = 'md',
    interactive = false,
    onChange,
    showValue = false,
    className = ''
}) {
    const sizeClasses = {
        sm: 'w-3 h-3',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
        xl: 'w-8 h-8'
    }

    const textSizeClasses = {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
        xl: 'text-lg'
    }

    const handleClick = (star) => {
        if (interactive && onChange) {
            onChange(star)
        }
    }

    const handleKeyDown = (e, star) => {
        if (interactive && onChange && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault()
            onChange(star)
        }
    }

    const stars = Array.from({ length: max }, (_, i) => {
        const starValue = i + 1
        const isFilled = starValue <= Math.floor(value)
        const isHalf = starValue === Math.ceil(value) && value % 1 !== 0

        return (
            <span
                key={starValue}
                role={interactive ? 'button' : undefined}
                tabIndex={interactive ? 0 : undefined}
                onClick={() => handleClick(starValue)}
                onKeyDown={(e) => handleKeyDown(e, starValue)}
                className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
                aria-label={interactive ? `Rate ${starValue} out of ${max}` : undefined}
            >
                {isFilled ? (
                    <svg className={`${sizeClasses[size]} text-secondary-400`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ) : isHalf ? (
                    <svg className={`${sizeClasses[size]} text-secondary-400`} viewBox="0 0 20 20">
                        <defs>
                            <linearGradient id="halfGrad">
                                <stop offset="50%" stopColor="currentColor" />
                                <stop offset="50%" stopColor="#e2e8f0" />
                            </linearGradient>
                        </defs>
                        <path fill="url(#halfGrad)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ) : (
                    <svg className={`${sizeClasses[size]} text-slate-300 dark:text-slate-600`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                )}
            </span>
        )
    })

    return (
        <div className={`flex items-center gap-0.5 ${className}`} role="img" aria-label={`Rating: ${value} out of ${max}`}>
            {stars}
            {showValue && (
                <span className={`ml-1.5 font-medium text-slate-600 dark:text-slate-400 ${textSizeClasses[size]}`}>
                    {value.toFixed(1)}
                </span>
            )}
        </div>
    )
}

Rating.propTypes = {
    value: PropTypes.number,
    max: PropTypes.number,
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
    interactive: PropTypes.bool,
    onChange: PropTypes.func,
    showValue: PropTypes.bool,
    className: PropTypes.string
}

export default Rating

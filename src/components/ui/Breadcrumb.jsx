import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

/**
 * Breadcrumb navigation component
 */
export function Breadcrumb({ items, className = '' }) {
    return (
        <nav aria-label="Breadcrumb" className={className}>
            <ol className="flex items-center gap-2 text-sm">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1

                    return (
                        <li key={index} className="flex items-center gap-2">
                            {!isLast ? (
                                <>
                                    <Link
                                        to={item.href}
                                        className="text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                    <svg
                                        className="w-4 h-4 text-slate-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </>
                            ) : (
                                <span className="text-slate-800 dark:text-slate-200 font-medium" aria-current="page">
                                    {item.label}
                                </span>
                            )}
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}

Breadcrumb.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            href: PropTypes.string
        })
    ).isRequired,
    className: PropTypes.string
}

export default Breadcrumb

import PropTypes from 'prop-types'

/**
 * Pagination component
 */
export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    showFirstLast = true,
    maxVisiblePages = 5,
    className = ''
}) {
    if (totalPages <= 1) return null

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages = []
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

        // Adjust start if we're near the end
        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1)
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i)
        }

        return pages
    }

    const pages = getPageNumbers()
    const canGoPrev = currentPage > 1
    const canGoNext = currentPage < totalPages

    const buttonClasses = 'flex items-center justify-center w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200'
    const activeClasses = 'bg-primary-600 text-white shadow-lg shadow-primary-500/25'
    const inactiveClasses = 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
    const disabledClasses = 'text-slate-300 dark:text-slate-600 cursor-not-allowed'

    return (
        <nav aria-label="Pagination" className={`flex items-center gap-1 ${className}`}>
            {/* First page */}
            {showFirstLast && (
                <button
                    onClick={() => onPageChange(1)}
                    disabled={!canGoPrev}
                    className={`${buttonClasses} ${canGoPrev ? inactiveClasses : disabledClasses}`}
                    aria-label="First page"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg>
                </button>
            )}

            {/* Previous page */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={!canGoPrev}
                className={`${buttonClasses} ${canGoPrev ? inactiveClasses : disabledClasses}`}
                aria-label="Previous page"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            {/* Page numbers */}
            <div className="flex items-center gap-1">
                {pages[0] > 1 && (
                    <>
                        <button
                            onClick={() => onPageChange(1)}
                            className={`${buttonClasses} ${inactiveClasses}`}
                        >
                            1
                        </button>
                        {pages[0] > 2 && (
                            <span className="px-1 text-slate-400">...</span>
                        )}
                    </>
                )}

                {pages.map(page => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`${buttonClasses} ${page === currentPage ? activeClasses : inactiveClasses}`}
                        aria-current={page === currentPage ? 'page' : undefined}
                    >
                        {page}
                    </button>
                ))}

                {pages[pages.length - 1] < totalPages && (
                    <>
                        {pages[pages.length - 1] < totalPages - 1 && (
                            <span className="px-1 text-slate-400">...</span>
                        )}
                        <button
                            onClick={() => onPageChange(totalPages)}
                            className={`${buttonClasses} ${inactiveClasses}`}
                        >
                            {totalPages}
                        </button>
                    </>
                )}
            </div>

            {/* Next page */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!canGoNext}
                className={`${buttonClasses} ${canGoNext ? inactiveClasses : disabledClasses}`}
                aria-label="Next page"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Last page */}
            {showFirstLast && (
                <button
                    onClick={() => onPageChange(totalPages)}
                    disabled={!canGoNext}
                    className={`${buttonClasses} ${canGoNext ? inactiveClasses : disabledClasses}`}
                    aria-label="Last page"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                </button>
            )}
        </nav>
    )
}

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    showFirstLast: PropTypes.bool,
    maxVisiblePages: PropTypes.number,
    className: PropTypes.string
}

export default Pagination

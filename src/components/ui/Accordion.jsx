import { useState } from 'react'
import PropTypes from 'prop-types'

/**
 * Accordion component for FAQ and collapsible content
 */
export function Accordion({ items, allowMultiple = false, className = '' }) {
    const [openItems, setOpenItems] = useState([])

    const toggleItem = (index) => {
        if (allowMultiple) {
            setOpenItems(prev =>
                prev.includes(index)
                    ? prev.filter(i => i !== index)
                    : [...prev, index]
            )
        } else {
            setOpenItems(prev =>
                prev.includes(index) ? [] : [index]
            )
        }
    }

    const isOpen = (index) => openItems.includes(index)

    return (
        <div className={`space-y-3 ${className}`}>
            {items.map((item, index) => (
                <div
                    key={item.id || index}
                    className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                >
                    <button
                        onClick={() => toggleItem(index)}
                        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                        aria-expanded={isOpen(index)}
                        aria-controls={`accordion-panel-${index}`}
                    >
                        <span className="font-medium text-slate-800 dark:text-white pr-4">
                            {item.title}
                        </span>
                        <svg
                            className={`w-5 h-5 text-slate-500 transition-transform duration-200 flex-shrink-0 ${isOpen(index) ? 'rotate-180' : ''
                                }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    <div
                        id={`accordion-panel-${index}`}
                        className={`overflow-hidden transition-all duration-200 ${isOpen(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                        role="region"
                        aria-labelledby={`accordion-header-${index}`}
                    >
                        <div className="px-6 pb-4 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                            {item.content}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

Accordion.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            title: PropTypes.string.isRequired,
            content: PropTypes.node.isRequired
        })
    ).isRequired,
    allowMultiple: PropTypes.bool,
    className: PropTypes.string
}

export default Accordion

import { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useClickOutside } from '../../hooks/useClickOutside'

/**
 * Custom Select/Dropdown component
 */
export function Select({
    options,
    value,
    onChange,
    placeholder = 'Select an option',
    label,
    error,
    disabled = false,
    searchable = false,
    className = ''
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const inputRef = useRef(null)

    const dropdownRef = useClickOutside(() => setIsOpen(false))

    const selectedOption = options.find(opt => opt.value === value)

    const filteredOptions = searchable && searchQuery
        ? options.filter(opt =>
            opt.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : options

    useEffect(() => {
        if (isOpen && searchable && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isOpen, searchable])

    const handleSelect = (option) => {
        onChange(option.value)
        setIsOpen(false)
        setSearchQuery('')
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            setIsOpen(false)
        } else if (e.key === 'Enter' && !isOpen) {
            setIsOpen(true)
        }
    }

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            {label && (
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    {label}
                </label>
            )}

            <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                className={`
          w-full flex items-center justify-between px-4 py-3 text-sm text-left
          border rounded-xl bg-white dark:bg-slate-800 
          transition-all duration-200
          ${error
                        ? 'border-red-500 focus:ring-red-500/20'
                        : 'border-slate-300 dark:border-slate-600 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20'
                    }
          ${disabled ? 'opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-900' : 'cursor-pointer'}
        `}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className={selectedOption ? 'text-slate-800 dark:text-slate-100' : 'text-slate-400'}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <svg
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div
                    className="absolute z-50 w-full mt-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg max-h-60 overflow-auto animate-slide-down"
                    role="listbox"
                >
                    {searchable && (
                        <div className="px-3 py-2 border-b border-slate-200 dark:border-slate-700">
                            <input
                                ref={inputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search..."
                                className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                            />
                        </div>
                    )}

                    {filteredOptions.length === 0 ? (
                        <div className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400 text-center">
                            No options found
                        </div>
                    ) : (
                        filteredOptions.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => handleSelect(option)}
                                className={`
                  w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left
                  hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors
                  ${option.value === value ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600' : 'text-slate-700 dark:text-slate-200'}
                `}
                                role="option"
                                aria-selected={option.value === value}
                            >
                                {option.icon && <span>{option.icon}</span>}
                                <span>{option.label}</span>
                                {option.value === value && (
                                    <svg className="w-4 h-4 ml-auto text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>
                        ))
                    )}
                </div>
            )}

            {error && (
                <p className="mt-1.5 text-xs text-red-500">{error}</p>
            )}
        </div>
    )
}

Select.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.string.isRequired,
            icon: PropTypes.node
        })
    ).isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    error: PropTypes.string,
    disabled: PropTypes.bool,
    searchable: PropTypes.bool,
    className: PropTypes.string
}

export default Select

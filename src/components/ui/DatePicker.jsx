import { useState } from 'react'
import PropTypes from 'prop-types'
import { getCalendarDays, getMonthName, formatDate, isPastDate, isDateBooked } from '../../utils/dateUtils'

/**
 * DatePicker component with calendar view
 */
export function DatePicker({
    label,
    value,
    onChange,
    minDate,
    maxDate,
    disabledDates = [],
    carId,
    placeholder = 'Select date',
    error,
    className = ''
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [viewDate, setViewDate] = useState(() => {
        if (value) return new Date(value)
        if (minDate) return new Date(minDate)
        return new Date()
    })

    const year = viewDate.getFullYear()
    const month = viewDate.getMonth()
    const days = getCalendarDays(year, month)
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const goToPrevMonth = () => {
        setViewDate(new Date(year, month - 1, 1))
    }

    const goToNextMonth = () => {
        setViewDate(new Date(year, month + 1, 1))
    }

    const isDisabled = (date) => {
        if (!date) return true
        if (isPastDate(date)) return true
        if (carId && isDateBooked(date, carId)) return true
        if (disabledDates.includes(date)) return true
        if (minDate && new Date(date) < new Date(minDate)) return true
        if (maxDate && new Date(date) > new Date(maxDate)) return true
        return false
    }

    const handleSelect = (date) => {
        if (isDisabled(date)) return
        onChange(date)
        setIsOpen(false)
    }

    return (
        <div className={`relative ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    {label}
                </label>
            )}

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`
          w-full flex items-center gap-3 px-4 py-3 text-sm text-left
          border rounded-xl bg-white dark:bg-slate-800 transition-all duration-200
          ${error
                        ? 'border-red-500 focus:ring-red-500/20'
                        : 'border-slate-300 dark:border-slate-600 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20'
                    }
        `}
            >
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className={value ? 'text-slate-800 dark:text-slate-100' : 'text-slate-400'}>
                    {value ? formatDate(value) : placeholder}
                </span>
            </button>

            {isOpen && (
                <div className="absolute z-50 mt-2 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg animate-slide-down">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <button
                            type="button"
                            onClick={goToPrevMonth}
                            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <span className="font-semibold text-slate-800 dark:text-white">
                            {getMonthName(viewDate)} {year}
                        </span>
                        <button
                            type="button"
                            onClick={goToNextMonth}
                            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Week days */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {weekDays.map(day => (
                            <div key={day} className="text-center text-xs font-medium text-slate-500 dark:text-slate-400 py-1">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar days */}
                    <div className="grid grid-cols-7 gap-1">
                        {days.map((dayInfo, index) => {
                            const disabled = isDisabled(dayInfo.date)
                            const isSelected = value === dayInfo.date
                            const isBooked = carId && dayInfo.date && isDateBooked(dayInfo.date, carId)

                            return (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => handleSelect(dayInfo.date)}
                                    disabled={disabled || !dayInfo.date}
                                    className={`
                    w-9 h-9 flex items-center justify-center rounded-lg text-sm transition-all
                    ${!dayInfo.date ? 'invisible' : ''}
                    ${isSelected ? 'bg-primary-600 text-white font-semibold' : ''}
                    ${dayInfo.isToday && !isSelected ? 'ring-2 ring-primary-500' : ''}
                    ${isBooked ? 'bg-red-100 dark:bg-red-900/30 text-red-500 line-through' : ''}
                    ${disabled && !isBooked ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed' : ''}
                    ${!disabled && !isSelected ? 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200' : ''}
                  `}
                                >
                                    {dayInfo.day}
                                </button>
                            )
                        })}
                    </div>

                    {/* Legend */}
                    {carId && (
                        <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center gap-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                                <span className="w-3 h-3 bg-red-100 dark:bg-red-900/30 rounded" />
                                Booked
                            </span>
                        </div>
                    )}
                </div>
            )}

            {error && (
                <p className="mt-1.5 text-xs text-red-500">{error}</p>
            )}
        </div>
    )
}

DatePicker.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    minDate: PropTypes.string,
    maxDate: PropTypes.string,
    disabledDates: PropTypes.arrayOf(PropTypes.string),
    carId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    placeholder: PropTypes.string,
    error: PropTypes.string,
    className: PropTypes.string
}

export default DatePicker

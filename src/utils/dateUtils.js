// Date utility functions

// Format date for display
export const formatDate = (date, options = {}) => {
    if (!date) return ''

    const defaultOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        ...options
    }

    return new Date(date).toLocaleDateString('en-US', defaultOptions)
}

// Format date for input fields (YYYY-MM-DD)
export const formatDateForInput = (date) => {
    if (!date) return ''
    const d = new Date(date)
    return d.toISOString().split('T')[0]
}

// Format date and time
export const formatDateTime = (date) => {
    if (!date) return ''
    return new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

// Format relative date (e.g., "2 days ago")
export const formatRelativeDate = (date) => {
    if (!date) return ''

    const now = new Date()
    const past = new Date(date)
    const diffMs = now - past
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
    return `${Math.floor(diffDays / 365)} years ago`
}

// Get today's date
export const getToday = () => {
    return formatDateForInput(new Date())
}

// Get tomorrow's date
export const getTomorrow = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return formatDateForInput(tomorrow)
}

// Get date X days from now
export const getDateFromNow = (days) => {
    const date = new Date()
    date.setDate(date.getDate() + days)
    return formatDateForInput(date)
}

// Check if date is in the past
export const isPastDate = (date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return new Date(date) < today
}

// Check if date is today
export const isToday = (date) => {
    const today = new Date()
    const d = new Date(date)
    return d.toDateString() === today.toDateString()
}

// Get days between two dates
export const getDaysBetween = (startDate, endDate) => {
    if (!startDate || !endDate) return 0
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end - start)
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

// Get month name
export const getMonthName = (date) => {
    return new Date(date).toLocaleString('en-US', { month: 'long' })
}

// Get day name
export const getDayName = (date) => {
    return new Date(date).toLocaleString('en-US', { weekday: 'long' })
}

// Get short day name
export const getShortDayName = (date) => {
    return new Date(date).toLocaleString('en-US', { weekday: 'short' })
}

// Generate calendar days for a month
export const getCalendarDays = (year, month) => {
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()

    const days = []

    // Add empty days for previous month
    for (let i = 0; i < startingDay; i++) {
        days.push({ date: null, disabled: true })
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day)
        days.push({
            date: formatDateForInput(date),
            day,
            disabled: isPastDate(date),
            isToday: isToday(date)
        })
    }

    return days
}

// Mock booked dates (for demonstration)
export const getBookedDates = () => {
    // Return some mock booked dates
    const today = new Date()
    const bookedDates = []

    // Add some random booked dates in the next 30 days
    for (let i = 5; i < 30; i += 7) {
        const date = new Date(today)
        date.setDate(date.getDate() + i)
        bookedDates.push(formatDateForInput(date))

        // Add consecutive day
        date.setDate(date.getDate() + 1)
        bookedDates.push(formatDateForInput(date))
    }

    return bookedDates
}

// Check if date is booked
export const isDateBooked = (date) => {
    const bookedDates = getBookedDates()
    return bookedDates.includes(date)
}

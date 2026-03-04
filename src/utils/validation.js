// Form validation utilities

// Email validation
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

// Phone validation (US format)
export const isValidPhone = (phone) => {
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[- \s.]?[0-9]{3}[- \s.]?[0-9]{4,6}$/
    return phoneRegex.test(phone.replace(/\s/g, ''))
}

// License number validation (basic alphanumeric)
export const isValidLicenseNumber = (license) => {
    const licenseRegex = /^[A-Z0-9]{5,15}$/i
    return licenseRegex.test(license.replace(/\s/g, ''))
}

// Credit card number validation (Luhn algorithm)
export const isValidCardNumber = (cardNumber) => {
    const number = cardNumber.replace(/\s/g, '')
    if (!/^\d{13,19}$/.test(number)) return false

    let sum = 0
    let isEven = false

    for (let i = number.length - 1; i >= 0; i--) {
        let digit = parseInt(number[i], 10)

        if (isEven) {
            digit *= 2
            if (digit > 9) digit -= 9
        }

        sum += digit
        isEven = !isEven
    }

    return sum % 10 === 0
}

// Card expiry validation (MM/YY format)
export const isValidExpiry = (expiry) => {
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/
    if (!expiryRegex.test(expiry)) return false

    const [month, year] = expiry.split('/')
    const expDate = new Date(2000 + parseInt(year), parseInt(month) - 1)
    return expDate > new Date()
}

// CVV validation
export const isValidCVV = (cvv) => {
    return /^\d{3,4}$/.test(cvv)
}

// Name validation (at least 2 characters)
export const isValidName = (name) => {
    return name && name.trim().length >= 2
}

// Age validation (must be 21 or older)
export const isValidAge = (dateOfBirth) => {
    if (!dateOfBirth) return false
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }
    return age >= 21
}

// Required field validation
export const isRequired = (value) => {
    if (typeof value === 'string') return value.trim().length > 0
    return value !== null && value !== undefined
}

// Min length validation
export const minLength = (value, min) => {
    return value && value.length >= min
}

// Max length validation
export const maxLength = (value, max) => {
    return !value || value.length <= max
}

// Validate form field
export const validateField = (name, value, rules = {}) => {
    const errors = []

    if (rules.required && !isRequired(value)) {
        errors.push(`${name} is required`)
    }

    if (value && rules.email && !isValidEmail(value)) {
        errors.push('Please enter a valid email address')
    }

    if (value && rules.phone && !isValidPhone(value)) {
        errors.push('Please enter a valid phone number')
    }

    if (value && rules.minLength && !minLength(value, rules.minLength)) {
        errors.push(`${name} must be at least ${rules.minLength} characters`)
    }

    if (value && rules.maxLength && !maxLength(value, rules.maxLength)) {
        errors.push(`${name} must be no more than ${rules.maxLength} characters`)
    }

    return errors
}

// Validation rules for booking form
export const bookingValidationRules = {
    step1: {
        pickupLocation: { required: true },
        returnLocation: { required: true },
        pickupDate: { required: true },
        returnDate: { required: true }
    },
    step3: {
        firstName: { required: true, minLength: 2 },
        lastName: { required: true, minLength: 2 },
        email: { required: true, email: true },
        phone: { required: true, phone: true },
        licenseNumber: { required: true, minLength: 5 },
        dateOfBirth: { required: true }
    },
    step4: {
        cardNumber: { required: true },
        cardName: { required: true },
        expiryDate: { required: true },
        cvv: { required: true }
    }
}

// Validate entire form step
export const validateStep = (step, data) => {
    const rules = bookingValidationRules[`step${step}`]
    if (!rules) return { valid: true, errors: {} }

    const errors = {}
    let valid = true

    Object.entries(rules).forEach(([field, fieldRules]) => {
        const fieldErrors = validateField(field, data[field], fieldRules)
        if (fieldErrors.length > 0) {
            errors[field] = fieldErrors[0] // Just first error
            valid = false
        }
    })

    return { valid, errors }
}

// Format card number with spaces
export const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4))
    }

    return parts.length ? parts.join(' ') : value
}

// Format phone number
export const formatPhoneNumber = (value) => {
    const cleaned = ('' + value).replace(/\D/g, '')
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return value
}

// Format expiry date
export const formatExpiryDate = (value) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length >= 2) {
        return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4)
    }
    return cleaned
}

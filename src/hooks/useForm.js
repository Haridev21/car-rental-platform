import { useState, useCallback } from 'react'

/**
 * Custom hook for form handling with validation
 * @param {Object} initialValues - initial form values
 * @param {Function} validate - validation function that returns errors object
 * @param {Function} onSubmit - submit handler function
 * @returns {Object} - form state and handlers
 */
export function useForm(initialValues = {}, validate = null, onSubmit = null) {
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})
    const [touched, setTouched] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Handle input change
    const handleChange = useCallback((e) => {
        const { name, value, type, checked } = e.target
        const newValue = type === 'checkbox' ? checked : value

        setValues(prev => ({
            ...prev,
            [name]: newValue
        }))

        // Clear error when field is modified
        if (errors[name]) {
            setErrors(prev => {
                // eslint-disable-next-line no-unused-vars
                const { [name]: _removed, ...rest } = prev
                return rest
            })
        }
    }, [errors])

    // Handle blur (mark field as touched)
    const handleBlur = useCallback((e) => {
        const { name } = e.target
        setTouched(prev => ({
            ...prev,
            [name]: true
        }))

        // Validate single field on blur
        if (validate) {
            const allErrors = validate(values)
            if (allErrors[name]) {
                setErrors(prev => ({
                    ...prev,
                    [name]: allErrors[name]
                }))
            }
        }
    }, [values, validate])

    // Set field value programmatically
    const setFieldValue = useCallback((name, value) => {
        setValues(prev => ({
            ...prev,
            [name]: value
        }))
    }, [])

    // Set field error
    const setFieldError = useCallback((name, error) => {
        setErrors(prev => ({
            ...prev,
            [name]: error
        }))
    }, [])

    // Set multiple values at once
    const setMultipleValues = useCallback((newValues) => {
        setValues(prev => ({
            ...prev,
            ...newValues
        }))
    }, [])

    // Validate all fields
    const validateForm = useCallback(() => {
        if (!validate) return true

        const validationErrors = validate(values)
        setErrors(validationErrors)

        // Mark all fields as touched
        const allTouched = Object.keys(values).reduce((acc, key) => {
            acc[key] = true
            return acc
        }, {})
        setTouched(allTouched)

        return Object.keys(validationErrors).length === 0
    }, [values, validate])

    // Handle form submit
    const handleSubmit = useCallback(async (e) => {
        if (e) e.preventDefault()

        const isValid = validateForm()

        if (isValid && onSubmit) {
            setIsSubmitting(true)
            try {
                await onSubmit(values)
            } catch (error) {
                console.error('Form submission error:', error)
            } finally {
                setIsSubmitting(false)
            }
        }
    }, [values, validateForm, onSubmit])

    // Reset form to initial state
    const resetForm = useCallback(() => {
        setValues(initialValues)
        setErrors({})
        setTouched({})
        setIsSubmitting(false)
    }, [initialValues])

    // Check if form is valid
    const isValid = Object.keys(errors).length === 0

    // Check if form has been modified
    const isDirty = JSON.stringify(values) !== JSON.stringify(initialValues)

    return {
        values,
        errors,
        touched,
        isSubmitting,
        isValid,
        isDirty,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        setFieldError,
        setMultipleValues,
        setErrors,
        resetForm,
        validateForm
    }
}

export default useForm

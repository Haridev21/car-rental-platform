import { forwardRef } from 'react'
import PropTypes from 'prop-types'

/**
 * Reusable Input component with validation states
 */
export const Input = forwardRef(function Input({
    type = 'text',
    label,
    name,
    value,
    placeholder,
    error,
    helperText,
    icon,
    iconPosition = 'left',
    disabled = false,
    required = false,
    className = '',
    inputClassName = '',
    onChange,
    onBlur,
    ...props
}, ref) {
    const hasError = !!error

    const baseInputClasses = 'w-full px-4 py-3 text-sm border rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-200'

    const stateClasses = hasError
        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
        : 'border-slate-300 dark:border-slate-600 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20'

    const iconPadding = icon ? (iconPosition === 'left' ? 'pl-11' : 'pr-11') : ''

    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-900' : ''

    const inputClasses = `${baseInputClasses} ${stateClasses} ${iconPadding} ${disabledClasses} ${inputClassName}`

    return (
        <div className={`relative ${className}`}>
            {label && (
                <label
                    htmlFor={name}
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <div className="relative">
                {icon && iconPosition === 'left' && (
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                        {icon}
                    </div>
                )}

                <input
                    ref={ref}
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                    className={inputClasses}
                    onChange={onChange}
                    onBlur={onBlur}
                    aria-invalid={hasError}
                    aria-describedby={hasError ? `${name}-error` : helperText ? `${name}-helper` : undefined}
                    {...props}
                />

                {icon && iconPosition === 'right' && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                        {icon}
                    </div>
                )}
            </div>

            {(error || helperText) && (
                <p
                    id={hasError ? `${name}-error` : `${name}-helper`}
                    className={`mt-1.5 text-xs ${hasError ? 'text-red-500' : 'text-slate-500 dark:text-slate-400'}`}
                >
                    {error || helperText}
                </p>
            )}
        </div>
    )
})

Input.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    placeholder: PropTypes.string,
    error: PropTypes.string,
    helperText: PropTypes.string,
    icon: PropTypes.node,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    className: PropTypes.string,
    inputClassName: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func
}

export default Input

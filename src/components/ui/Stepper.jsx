import PropTypes from 'prop-types'

/**
 * Progress stepper component for multi-step flows
 */
export function Stepper({
    steps,
    currentStep,
    onStepClick,
    clickable = false,
    className = ''
}) {
    return (
        <nav aria-label="Progress" className={className}>
            <ol className="flex items-center">
                {steps.map((step, index) => {
                    const stepNumber = index + 1
                    const isCompleted = stepNumber < currentStep
                    const isCurrent = stepNumber === currentStep
                    const isClickable = clickable && stepNumber < currentStep

                    return (
                        <li
                            key={step.id || index}
                            className={`relative flex-1 ${index !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}
                        >
                            {/* Connector line */}
                            {index !== steps.length - 1 && (
                                <div
                                    className={`absolute top-4 left-8 -right-4 sm:-right-12 h-0.5 ${isCompleted ? 'bg-primary-600' : 'bg-slate-200 dark:bg-slate-700'
                                        }`}
                                    aria-hidden="true"
                                />
                            )}

                            <div
                                className={`group flex items-center ${isClickable ? 'cursor-pointer' : ''}`}
                                onClick={() => isClickable && onStepClick?.(stepNumber)}
                                role={isClickable ? 'button' : undefined}
                                tabIndex={isClickable ? 0 : undefined}
                                onKeyDown={(e) => {
                                    if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
                                        onStepClick?.(stepNumber)
                                    }
                                }}
                            >
                                {/* Step circle */}
                                <span className="relative flex items-center justify-center">
                                    <span
                                        className={`
                      w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-200
                      ${isCompleted
                                                ? 'bg-primary-600 text-white'
                                                : isCurrent
                                                    ? 'bg-primary-600 text-white ring-4 ring-primary-100 dark:ring-primary-900/50'
                                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                                            }
                      ${isClickable ? 'group-hover:ring-2 group-hover:ring-primary-200' : ''}
                    `}
                                    >
                                        {isCompleted ? (
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            stepNumber
                                        )}
                                    </span>
                                </span>

                                {/* Step label */}
                                <span className="ml-3 hidden sm:block">
                                    <span
                                        className={`text-sm font-medium ${isCurrent || isCompleted
                                                ? 'text-slate-800 dark:text-white'
                                                : 'text-slate-500 dark:text-slate-400'
                                            }`}
                                    >
                                        {step.title}
                                    </span>
                                    {step.description && (
                                        <span className="block text-xs text-slate-500 dark:text-slate-400">
                                            {step.description}
                                        </span>
                                    )}
                                </span>
                            </div>
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}

Stepper.propTypes = {
    steps: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            title: PropTypes.string.isRequired,
            description: PropTypes.string
        })
    ).isRequired,
    currentStep: PropTypes.number.isRequired,
    onStepClick: PropTypes.func,
    clickable: PropTypes.bool,
    className: PropTypes.string
}

export default Stepper

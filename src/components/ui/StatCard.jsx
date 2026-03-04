import PropTypes from 'prop-types'

/**
 * StatCard for dashboard metrics
 */
export function StatCard({ title, value, icon, trend, description }) {
    const isPositive = trend?.startsWith('+')

    return (
        <div className="bg-white dark:bg-slate-800 p-6 lg:p-8 rounded-[32px] shadow-card border border-slate-100 dark:border-slate-800 hover:shadow-dashboard transition-all group">
            <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-slate-50 dark:bg-slate-700/50 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {icon}
                </div>
                {trend && (
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-black ${isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                        {trend}
                    </span>
                )}
            </div>
            <div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
                <h4 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{value}</h4>
                {description && <p className="text-xs text-slate-400 mt-2 font-medium">{description}</p>}
            </div>
        </div>
    )
}

StatCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    icon: PropTypes.node,
    trend: PropTypes.string,
    description: PropTypes.string
}

export default StatCard

import { Breadcrumb } from '../components/ui/Breadcrumb'

export default function AboutPage() {
    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
            <div className="container-custom py-8">
                <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About Us' }]} className="mb-8" />

                <div className="max-w-4xl mx-auto">
                    {/* Hero */}
                    <div className="text-center mb-16">
                        <h1 className="heading-1 text-slate-800 dark:text-white mb-4">About DriveEase</h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400">Your trusted partner for premium car rentals since 2010.</p>
                    </div>

                    {/* Story */}
                    <section className="mb-16">
                        <h2 className="heading-2 text-slate-800 dark:text-white mb-4">Our Story</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                            DriveEase was founded with a simple mission: to make car rental easy, affordable, and enjoyable. What started as a small fleet of 10 vehicles has grown into a nationwide network with over 200 cars across 50+ locations.
                        </p>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            We believe that the journey is just as important as the destination. That&apos;s why we offer a diverse range of vehicles, from fuel-efficient compact cars to luxurious SUVs and sporty convertibles, ensuring there&apos;s a perfect ride for every occasion.
                        </p>
                    </section>

                    {/* Mission */}
                    <section className="mb-16 bg-primary-50 dark:bg-primary-900/30 rounded-2xl p-8">
                        <h2 className="heading-2 text-primary-900 dark:text-primary-100 mb-4">Our Mission</h2>
                        <p className="text-primary-800 dark:text-primary-200 text-lg">
                            To provide exceptional mobility solutions that empower our customers to explore freely, travel safely, and create unforgettable memories on the road.
                        </p>
                    </section>

                    {/* Stats */}
                    <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { value: '200+', label: 'Vehicles' },
                            { value: '50+', label: 'Locations' },
                            { value: '100K+', label: 'Happy Customers' },
                            { value: '13+', label: 'Years Experience' }
                        ].map((stat, i) => (
                            <div key={i} className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-card">
                                <p className="text-3xl font-bold text-primary-600">{stat.value}</p>
                                <p className="text-slate-500 text-sm">{stat.label}</p>
                            </div>
                        ))}
                    </section>
                </div>
            </div>
        </div>
    )
}

import { Breadcrumb } from '../components/ui/Breadcrumb'

export default function TermsPage() {
    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
            <div className="container-custom py-8">
                <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Terms of Service' }]} className="mb-8" />

                <article className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-card prose dark:prose-invert max-w-none">
                    <h1>Terms of Service</h1>
                    <p className="text-sm text-slate-500">Last updated: January 2024</p>

                    <h2>1. Acceptance of Terms</h2>
                    <p>By accessing and using DriveEase services, you accept and agree to be bound by the terms and provisions of this agreement.</p>

                    <h2>2. Rental Requirements</h2>
                    <p>To rent a vehicle from DriveEase, you must be at least 21 years of age, possess a valid driver&apos;s license held for at least one year, and provide a valid payment method.</p>

                    <h2>3. Booking and Payments</h2>
                    <p>All bookings require full payment at the time of reservation. Prices include taxes and basic insurance. Additional extras are charged separately.</p>

                    <h2>4. Cancellation Policy</h2>
                    <p>Cancellations made more than 24 hours before the scheduled pickup time will receive a full refund. Cancellations within 24 hours may be subject to a fee.</p>

                    <h2>5. Vehicle Use</h2>
                    <p>Vehicles may only be driven by authorized drivers listed on the rental agreement. Smoking, transporting pets, and using vehicles for illegal purposes is strictly prohibited.</p>

                    <h2>6. Insurance and Liability</h2>
                    <p>Basic liability coverage is included. Additional coverage options are available at the time of booking. You are responsible for any damage not covered by insurance.</p>

                    <h2>7. Contact</h2>
                    <p>For questions about these terms, please contact us at legal@driveease.com.</p>
                </article>
            </div>
        </div>
    )
}

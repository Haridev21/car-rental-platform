import { Breadcrumb } from '../components/ui/Breadcrumb'

export default function PrivacyPage() {
    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
            <div className="container-custom py-8">
                <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} className="mb-8" />

                <article className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-card prose dark:prose-invert max-w-none">
                    <h1>Privacy Policy</h1>
                    <p className="text-sm text-slate-500">Last updated: January 2024</p>

                    <h2>Information We Collect</h2>
                    <p>We collect information you provide directly (name, email, phone, payment details) and automatically (device info, usage data, cookies).</p>

                    <h2>How We Use Your Information</h2>
                    <p>Your information is used to process bookings, communicate with you, improve our services, and send promotional offers with your consent.</p>

                    <h2>Information Sharing</h2>
                    <p>We do not sell your personal data. We share information only with payment processors, insurance providers, and as required by law.</p>

                    <h2>Data Security</h2>
                    <p>We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure.</p>

                    <h2>Your Rights</h2>
                    <p>You have the right to access, correct, or delete your personal data. Contact us at privacy@driveease.com to exercise these rights.</p>

                    <h2>Cookies</h2>
                    <p>We use cookies to enhance your experience. You can manage cookie preferences through your browser settings.</p>
                </article>
            </div>
        </div>
    )
}

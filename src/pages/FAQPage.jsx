import { Breadcrumb } from '../components/ui/Breadcrumb'
import { Accordion } from '../components/ui/Accordion'

const faqData = [
    {
        category: 'Booking', items: [
            { title: 'How do I book a car?', content: 'Simply browse our available cars, select your pickup and return dates, choose any extras, fill in your details, and complete the booking. You will receive a confirmation email immediately.' },
            { title: 'Can I modify my booking?', content: 'Yes, you can modify your booking up to 24 hours before pickup. Log into your account or contact our support team.' },
            { title: 'What is your cancellation policy?', content: 'Free cancellation up to 24 hours before pickup. Cancellations within 24 hours may incur a fee equal to one day rental.' }
        ]
    },
    {
        category: 'Payment', items: [
            { title: 'What payment methods do you accept?', content: 'We accept all major credit cards (Visa, Mastercard, American Express) and debit cards. Payment is required at the time of booking.' },
            { title: 'Is there a security deposit?', content: 'Yes, a security deposit is held on your card at pickup and released upon return of the vehicle in good condition.' }
        ]
    },
    {
        category: 'Requirements', items: [
            { title: 'What age do I need to be to rent?', content: 'You must be at least 21 years old to rent most vehicles. Some luxury and specialty cars require drivers to be 25+.' },
            { title: 'What documents do I need?', content: 'A valid driver\'s license (held for at least 1 year), a credit card in your name, and a valid ID or passport.' }
        ]
    },
    {
        category: 'Insurance', items: [
            { title: 'What insurance is included?', content: 'All rentals include basic liability insurance. We offer optional collision damage waiver (CDW) and personal accident insurance for extra protection.' },
            { title: 'Can I use my own insurance?', content: 'Yes, if you have personal car insurance that covers rentals, you may decline our insurance options. Please verify with your provider before pickup.' }
        ]
    }
]

export default function FAQPage() {
    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
            <div className="container-custom py-8">
                <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]} className="mb-8" />

                <div className="max-w-3xl mx-auto">
                    <h1 className="heading-1 text-slate-800 dark:text-white mb-4 text-center">Frequently Asked Questions</h1>
                    <p className="text-slate-600 dark:text-slate-400 text-center mb-12">Find answers to common questions about our services.</p>

                    <div className="space-y-8">
                        {faqData.map(section => (
                            <div key={section.category}>
                                <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">{section.category}</h2>
                                <div className="space-y-2">
                                    {section.items.map((item, i) => (
                                        <Accordion key={i} title={item.title} content={item.content} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

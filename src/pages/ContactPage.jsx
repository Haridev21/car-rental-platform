import { useState } from 'react'
import { Breadcrumb } from '../components/ui/Breadcrumb'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { useToast } from '../context/ToastContext'

export default function ContactPage() {
    const { success } = useToast()
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

    const handleSubmit = (e) => {
        e.preventDefault()
        success('Message sent! We will get back to you soon.')
        setForm({ name: '', email: '', subject: '', message: '' })
    }

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
            <div className="container-custom py-8">
                <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} className="mb-8" />

                <div className="max-w-4xl mx-auto">
                    <h1 className="heading-1 text-slate-800 dark:text-white mb-4 text-center">Contact Us</h1>
                    <p className="text-slate-600 dark:text-slate-400 text-center mb-12">Have questions? We&apos;d love to hear from you.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <div className="space-y-6">
                            {[
                                { icon: '📍', title: 'Address', content: '123 Main Street, New York, NY 10001' },
                                { icon: '📞', title: 'Phone', content: '+1 (800) 123-4567' },
                                { icon: '✉️', title: 'Email', content: 'support@driveease.com' },
                                { icon: '🕐', title: 'Hours', content: 'Mon - Fri: 8AM - 6PM' }
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <span className="text-2xl">{item.icon}</span>
                                    <div>
                                        <h3 className="font-semibold text-slate-800 dark:text-white">{item.title}</h3>
                                        <p className="text-slate-600 dark:text-slate-400">{item.content}</p>
                                    </div>
                                </div>
                            ))}

                            {/* Map placeholder */}
                            <div className="bg-slate-200 dark:bg-slate-700 rounded-xl h-48 flex items-center justify-center">
                                <span className="text-slate-500">Map placeholder</span>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-card space-y-4">
                            <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                            <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                            <Input label="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Message</label>
                                <textarea className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none h-32 resize-none" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
                            </div>
                            <Button type="submit" fullWidth>Send Message</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

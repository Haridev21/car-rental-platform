import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useToast } from '../../context/ToastContext'

export function Footer() {
    const [email, setEmail] = useState('')
    const { success } = useToast()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (email) {
            success('Thanks for subscribing!')
            setEmail('')
        }
    }

    const links = {
        company: [
            { to: '/about', label: 'About Us' },
            { to: '/contact', label: 'Contact' },
            { to: '/locations', label: 'Locations' }
        ],
        support: [
            { to: '/faq', label: 'FAQ' },
            { to: '/terms', label: 'Terms' },
            { to: '/privacy', label: 'Privacy' }
        ]
    }

    return (
        <footer className="bg-slate-900 text-slate-300">
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8m-4-4v8m-7 4h14a2 2 0 012 2v0a2 2 0 01-2 2H5a2 2 0 01-2-2v0a2 2 0 012-2z" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-white">Drive<span className="text-primary-400">Ease</span></span>
                        </Link>
                        <p className="text-slate-400 mb-4 max-w-sm text-sm">Your trusted partner for premium car rentals.</p>
                        <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm">
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:border-primary-500 focus:outline-none" />
                            <button type="submit" className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-xl">Subscribe</button>
                        </form>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold mb-3">Company</h3>
                        <ul className="space-y-2 text-sm">
                            {links.company.map(l => <li key={l.to}><Link to={l.to} className="hover:text-primary-400">{l.label}</Link></li>)}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold mb-3">Support</h3>
                        <ul className="space-y-2 text-sm">
                            {links.support.map(l => <li key={l.to}><Link to={l.to} className="hover:text-primary-400">{l.label}</Link></li>)}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="border-t border-slate-800 py-4">
                <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
                    <p>© {new Date().getFullYear()} DriveEase. All rights reserved.</p>
                    <div className="flex gap-4">
                        <a href="#" aria-label="Facebook" className="hover:text-white">FB</a>
                        <a href="#" aria-label="Twitter" className="hover:text-white">TW</a>
                        <a href="#" aria-label="Instagram" className="hover:text-white">IG</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer

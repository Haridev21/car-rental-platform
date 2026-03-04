import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../utils/api'
import { extras } from '../data/extras'
import { Stepper } from '../components/ui/Stepper'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/Select'
import { formatPrice, calculateTotalPrice, calculateDuration } from '../utils/pricing'
import { useToast } from '../context/ToastContext'
import { useAuth } from '../context/AuthContext'

export default function BookingPage() {
    const { carId } = useParams()
    const navigate = useNavigate()
    const { success: showToast } = useToast()
    const { user, isAuthenticated, openLoginModal } = useAuth()

    const [car, setCar] = useState(null)
    const [loading, setLoading] = useState(true)
    const [currentStep, setCurrentStep] = useState(1)
    const [locations, setLocations] = useState([])

    const [bookingData, setBookingData] = useState({
        pickupLocation: '',
        returnLocation: '',
        pickupDate: '',
        returnDate: '',
        selectedExtras: [],
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        paymentMethod: 'card',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    })

    useEffect(() => {
        if (!isAuthenticated) {
        }

        const fetchData = async () => {
            try {
                const [carRes, locRes] = await Promise.all([
                    api.get(`/cars/${carId}`),
                    api.get('/locations')
                ])
                setCar(carRes.car)
                setLocations(locRes.locations)

                if (user) {
                    setBookingData(prev => ({
                        ...prev,
                        firstName: user.name.split(' ')[0],
                        lastName: user.name.split(' ').slice(1).join(' '),
                        email: user.email,
                        phone: user.phone || ''
                    }))
                }
            } catch (err) {
                console.error('Error fetching booking data:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [carId, user])

    const days = calculateDuration(bookingData.pickupDate, bookingData.returnDate)
    const pricing = car ? calculateTotalPrice(
        car,
        days,
        bookingData.selectedExtras,
        bookingData.pickupDate
    ) : { total: 0, days: 0, basePrice: 0, extrasTotal: 0, taxes: 0 }

    const handleNext = () => {
        if (!isAuthenticated && currentStep === 2) {
            openLoginModal()
            return
        }
        setCurrentStep(prev => prev + 1)
    }
    const handleBack = () => setCurrentStep(prev => prev - 1)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!isAuthenticated) {
            openLoginModal()
            return
        }
        try {
            await api.post('/bookings', {
                car: carId,
                pickupLocation: bookingData.pickupLocation,
                returnLocation: bookingData.returnLocation,
                pickupDate: bookingData.pickupDate,
                returnDate: bookingData.returnDate,
                extras: bookingData.selectedExtras,
                customerInfo: {
                    firstName: bookingData.firstName,
                    lastName: bookingData.lastName,
                    email: bookingData.email,
                    phone: bookingData.phone
                },
                pricing
            })

            showToast('Booking Successful!', 'Your reservation has been confirmed. Redirecting to your dashboard...')
            setTimeout(() => navigate('/bookings'), 2000)
        } catch (err) {
            console.error('Booking failed:', err)
        }
    }

    if (loading) return (
        <div className="container-custom py-20 min-h-screen flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    )

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-12">
            <div className="container-custom">
                <div className="max-w-6xl mx-auto">
                    <Stepper
                        steps={[
                            { title: 'Rental Info' },
                            { title: 'Extras' },
                            { title: 'Details' },
                            { title: 'Payment' },
                            { title: 'Review' }
                        ]}
                        currentStep={currentStep}
                        className="mb-12"
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            {currentStep === 1 && (
                                <div className="bg-white dark:bg-slate-800 p-8 lg:p-10 rounded-[40px] shadow-card border border-slate-100 dark:border-slate-800 animate-fade-in">
                                    <h2 className="text-3xl font-black mb-8 dark:text-white tracking-tighter">Rental Period</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-6">
                                            <Select
                                                label="Pickup Location"
                                                value={bookingData.pickupLocation}
                                                onChange={(val) => setBookingData({ ...bookingData, pickupLocation: val })}
                                                options={locations.map(l => ({ value: l._id, label: l.name }))}
                                            />
                                            <Input
                                                type="date"
                                                label="Pickup Date"
                                                value={bookingData.pickupDate}
                                                onChange={(e) => setBookingData({ ...bookingData, pickupDate: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-6">
                                            <Select
                                                label="Return Location"
                                                value={bookingData.returnLocation}
                                                onChange={(val) => setBookingData({ ...bookingData, returnLocation: val })}
                                                options={locations.map(l => ({ value: l._id, label: l.name }))}
                                            />
                                            <Input
                                                type="date"
                                                label="Return Date"
                                                value={bookingData.returnDate}
                                                onChange={(e) => setBookingData({ ...bookingData, returnDate: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-12 flex justify-end">
                                        <Button onClick={handleNext} disabled={!bookingData.pickupDate || !bookingData.returnDate || !bookingData.pickupLocation} size="lg" rounded="2xl" className="px-12">
                                            Select Extras →
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div className="bg-white dark:bg-slate-800 p-8 lg:p-10 rounded-[40px] shadow-card border border-slate-100 dark:border-slate-800 animate-fade-in">
                                    <h2 className="text-3xl font-black mb-8 dark:text-white tracking-tighter">Enhance Your Trip</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {extras.map(extra => (
                                            <label key={extra.id} className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex justify-between items-center ${bookingData.selectedExtras.some(e => e.id === extra.id)
                                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10'
                                                : 'border-slate-50 dark:border-slate-700/50 hover:border-primary-200'
                                                }`}>
                                                <div className="flex items-center gap-4">
                                                    <input
                                                        type="checkbox"
                                                        className="w-6 h-6 text-primary-600 rounded-lg border-slate-300 focus:ring-primary-500"
                                                        checked={bookingData.selectedExtras.some(e => e.id === extra.id)}
                                                        onChange={() => {
                                                            const exists = bookingData.selectedExtras.find(e => e.id === extra.id)
                                                            if (exists) {
                                                                setBookingData({ ...bookingData, selectedExtras: bookingData.selectedExtras.filter(e => e.id !== extra.id) })
                                                            } else {
                                                                setBookingData({ ...bookingData, selectedExtras: [...bookingData.selectedExtras, extra] })
                                                            }
                                                        }}
                                                    />
                                                    <div>
                                                        <p className="font-bold text-slate-800 dark:text-white">{extra.name}</p>
                                                        <p className="text-xs text-slate-500">{extra.description}</p>
                                                    </div>
                                                </div>
                                                <span className="font-black text-primary-600">${extra.pricePerDay || extra.priceFixed}</span>
                                            </label>
                                        ))}
                                    </div>
                                    <div className="mt-12 flex justify-between">
                                        <Button variant="outline" onClick={handleBack} rounded="2xl">← Back</Button>
                                        <Button onClick={handleNext} rounded="2xl" className="px-12">Continue →</Button>
                                    </div>
                                </div>
                            )}

                            {currentStep >= 3 && (
                                <div className="bg-white dark:bg-slate-800 p-8 lg:p-10 rounded-[40px] shadow-card border border-slate-100 dark:border-slate-800 animate-fade-in">
                                    <h2 className="text-3xl font-black mb-8 dark:text-white tracking-tighter">
                                        {currentStep === 3 ? 'Personal Details' : currentStep === 4 ? 'Payment Info' : 'Confirm Reservation'}
                                    </h2>

                                    {currentStep === 3 && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Input label="First Name" value={bookingData.firstName} onChange={(e) => setBookingData({ ...bookingData, firstName: e.target.value })} />
                                            <Input label="Last Name" value={bookingData.lastName} onChange={(e) => setBookingData({ ...bookingData, lastName: e.target.value })} />
                                            <Input label="Email Address" type="email" value={bookingData.email} onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })} />
                                            <Input label="Phone Number" value={bookingData.phone} onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })} />
                                        </div>
                                    )}

                                    {currentStep === 4 && (
                                        <div className="space-y-6">
                                            <div className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl border border-primary-500">
                                                <input type="radio" checked readOnly />
                                                <span className="font-bold dark:text-white">Credit / Debit Card</span>
                                            </div>
                                            <Input label="Card Number" placeholder="0000 0000 0000 0000" />
                                            <div className="grid grid-cols-2 gap-4">
                                                <Input label="Expiry Date" placeholder="MM/YY" />
                                                <Input label="CVV" placeholder="123" />
                                            </div>
                                        </div>
                                    )}

                                    {currentStep === 5 && (
                                        <div className="space-y-6">
                                            <div className="p-6 bg-slate-50 dark:bg-slate-700/30 rounded-3xl">
                                                <p className="text-slate-500 text-sm font-bold uppercase mb-4 tracking-widest">Selected Period</p>
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <p className="text-xl font-black dark:text-white">{new Date(bookingData.pickupDate).toLocaleDateString()}</p>
                                                        <p className="text-xs text-slate-500">At Pickup Hub</p>
                                                    </div>
                                                    <div className="h-[2px] flex-1 mx-4 bg-slate-200 dark:bg-slate-700 relative">
                                                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 px-2 text-[10px] font-bold text-primary-600 uppercase">{days} Days</span>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-xl font-black dark:text-white">{new Date(bookingData.returnDate).toLocaleDateString()}</p>
                                                        <p className="text-xs text-slate-500">At Return Hub</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-sm text-slate-500 leading-relaxed italic">By clicking confirm, you agree to DriveEase terms and conditions and insurance policy.</p>
                                        </div>
                                    )}

                                    <div className="mt-12 flex justify-between">
                                        <Button variant="outline" onClick={handleBack} rounded="2xl group">← Back</Button>
                                        {currentStep === 5 ? (
                                            <Button onClick={handleSubmit} rounded="2xl" className="px-12 bg-green-600 hover:bg-green-700">Confirm Booking ✓</Button>
                                        ) : (
                                            <Button onClick={handleNext} rounded="2xl" className="px-12">Continue →</Button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <aside className="space-y-6">
                            <div className="bg-white dark:bg-slate-800 p-8 rounded-[40px] shadow-card border border-slate-100 dark:border-slate-800 sticky top-32">
                                <h3 className="text-xl font-black mb-8 dark:text-white tracking-tight">Price Summary</h3>
                                {car && (
                                    <div className="flex items-center gap-6 mb-8 pb-8 border-b dark:border-slate-700">
                                        <img src={car.image} className="w-24 h-24 object-cover rounded-3xl" alt="" />
                                        <div>
                                            <h4 className="font-bold text-lg dark:text-white leading-tight">{car.name}</h4>
                                            <p className="text-xs font-bold text-primary-600 uppercase tracking-widest mt-1">{car.type}</p>
                                        </div>
                                    </div>
                                )}
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500 font-medium">Rental Subtotal</span>
                                        <span className="font-bold dark:text-white">{formatPrice(pricing.basePrice - pricing.durationDiscount)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500 font-medium">Add-ons Total</span>
                                        <span className="font-bold dark:text-white">{formatPrice(pricing.extrasTotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500 font-medium">Service Fees & Taxes</span>
                                        <span className="font-bold dark:text-white">{formatPrice(pricing.taxes)}</span>
                                    </div>
                                    {pricing.promoDiscount > 0 && (
                                        <div className="flex justify-between text-sm text-green-600">
                                            <span className="font-medium">Applied Promo</span>
                                            <span className="font-bold">-{formatPrice(pricing.promoDiscount)}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="pt-6 border-t dark:border-slate-700 flex justify-between items-center">
                                    <span className="font-black text-lg dark:text-white">Final Total</span>
                                    <span className="font-black text-3xl text-primary-600">{formatPrice(pricing.total)}</span>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    )
}

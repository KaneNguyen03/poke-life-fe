import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import { Link } from 'react-scroll'

export const Footer: React.FC = () => {
    const { t } = useTranslation()
    const currentYear = new Date().getFullYear()

    const quickLinks = [
        { key: 'menu', labelKey: 'nav.menu' },
        { key: 'about', labelKey: 'nav.about' },
        { key: 'workouts', labelKey: 'nav.workouts' },
    ]

    const socialLinks = [
        { icon: FaFacebook, href: '#', label: 'Facebook' },
        { icon: FaInstagram, href: '#', label: 'Instagram' },
        { icon: FaTwitter, href: '#', label: 'Twitter' },
    ]

    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-green-400">Poke Life</h3>
                        <p className="text-gray-300 leading-relaxed">
                            {t('about.description.highlight')}
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social, index) => {
                                const Icon = social.icon
                                return (
                                    <a
                                        key={index}
                                        href={social.href}
                                        className="text-gray-400 hover:text-green-400 transition-colors duration-200"
                                        aria-label={social.label}
                                    >
                                        <Icon className="text-xl" />
                                    </a>
                                )
                            })}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">{t('footer.quickLinks')}</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.key}>
                                    <Link
                                        to={link.key}
                                        smooth
                                        duration={500}
                                        className="text-gray-300 hover:text-green-400 transition-colors duration-200 cursor-pointer"
                                    >
                                        {t(link.labelKey)}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <a
                                    href="/login"
                                    className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                                >
                                    {t('nav.login')}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">{t('footer.contactInfo')}</h4>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3 text-gray-300">
                                <FaMapMarkerAlt className="text-green-400 flex-shrink-0" />
                                <span>123 Poke Street, Food City</span>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-300">
                                <FaPhone className="text-green-400 flex-shrink-0" />
                                <a 
                                    href="tel:+15551234567" 
                                    className="hover:text-green-400 transition-colors duration-200"
                                >
                                    (555) 123-4567
                                </a>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-300">
                                <FaEnvelope className="text-green-400 flex-shrink-0" />
                                <a 
                                    href="mailto:info@pokelife.com" 
                                    className="hover:text-green-400 transition-colors duration-200"
                                >
                                    info@pokelife.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Newsletter</h4>
                        <p className="text-gray-300 text-sm">
                            Stay updated with our latest offers and news.
                        </p>
                        <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                aria-label="Email for newsletter"
                            />
                            <button
                                type="submit"
                                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700 mt-8 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-400 text-sm text-center md:text-left">
                            &copy; {currentYear} Poke Life. {t('footer.allRightsReserved')}.
                        </p>
                        <div className="flex space-x-6 text-sm">
                            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                                Terms of Service
                            </a>
                            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

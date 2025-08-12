import { Link } from "react-scroll"
import { useTranslation } from 'react-i18next'
import { FaArrowDown, FaPlay } from 'react-icons/fa'
import Background from "@/assets/background.jpg"
import { Button } from './button'

export default function Hero() {
    const { t } = useTranslation()

    return (
        <section 
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            role="banner"
            aria-label={t('hero.title')}
        >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={Background}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="eager"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-60"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                {/* Main Title */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                    <span className="block text-white drop-shadow-lg">
                        {t('hero.title')}
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
                    {t('hero.subtitle')}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                    <Link to="menu" smooth duration={500} className="w-full sm:w-auto">
                        <Button
                            variant="primary"
                            size="lg"
                            className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            <span className="flex items-center justify-center">
                                {t('hero.getStarted')}
                                <FaArrowDown className="ml-2" />
                            </span>
                        </Button>
                    </Link>

                    <Link to="about" smooth duration={500} className="w-full sm:w-auto">
                        <Button
                            variant="secondary"
                            size="lg"
                            className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
                        >
                            <span className="flex items-center justify-center">
                                <FaPlay className="mr-2" />
                                {t('nav.about')}
                            </span>
                        </Button>
                    </Link>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <Link to="about" smooth duration={500}>
                        <button 
                            className="text-white hover:text-green-400 transition-colors duration-300"
                            aria-label="Scroll to about section"
                        >
                            <FaArrowDown className="text-2xl" />
                        </button>
                    </Link>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-1/4 left-4 w-16 h-16 bg-green-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-8 w-20 h-20 bg-blue-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
            <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-yellow-400 rounded-full opacity-20 animate-pulse delay-500"></div>
        </section>
    )
}


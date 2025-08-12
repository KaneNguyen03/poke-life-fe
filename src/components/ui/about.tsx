import { Link } from "react-scroll"
import { useTranslation } from 'react-i18next'
import { FaUtensils, FaClock, FaHeart, FaLeaf, FaBalanceScale, FaShieldAlt } from 'react-icons/fa'

export default function About() {
  const { t } = useTranslation()

  const stats = [
    {
      icon: FaUtensils,
      title: t('about.stats.dishes'),
      value: '10+',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: FaClock,
      title: t('about.stats.experience'),
      value: '1+',
      color: 'from-blue-500 to-blue-600'
    }
  ]

  const features = [
    {
      icon: FaHeart,
      title: t('about.features.yummy.title'),
      description: t('about.features.yummy.description'),
      color: 'text-red-500'
    },
    {
      icon: FaLeaf,
      title: t('about.features.healthy.title'),
      description: t('about.features.healthy.description'),
      color: 'text-green-500'
    },
    {
      icon: FaBalanceScale,
      title: t('about.features.balance.title'),
      description: t('about.features.balance.description'),
      color: 'text-blue-500'
    },
    {
      icon: FaShieldAlt,
      title: t('about.features.clean.title'),
      description: t('about.features.clean.description'),
      color: 'text-purple-500'
    }
  ]

  return (
    <section id="about" className="bg-gradient-to-b from-green-50 to-white py-20">
      <div className="container mx-auto px-4">
        {/* Stats Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div 
                  key={index}
                  className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
                  <div className="relative p-8 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${stat.color} mb-4`}>
                      <IconComponent className="text-2xl text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">
                      {stat.title}
                    </h3>
                    <p className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Main About Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 mb-16">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/3 text-center lg:text-left">
              <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent mb-4">
                {t('about.title')}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto lg:mx-0 mb-6" />
            </div>
            
            <div className="lg:w-2/3">
              <div className="prose prose-lg text-gray-700 mb-8">
                <p className="text-xl leading-relaxed mb-6">
                  {t('about.description.part1')}
                </p>
                <p className="text-lg leading-relaxed">
                  <span className="font-semibold text-green-600">
                    {t('about.description.highlight')}
                  </span>
                  {t('about.description.part2')}
                </p>
              </div>
              
              <div className="flex justify-center lg:justify-end">
                <Link 
                  to="menu" 
                  smooth 
                  duration={500}
                  className="group cursor-pointer inline-flex items-center bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span className="mr-2">{t('about.learnMore')}</span>
                  <svg 
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div 
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6"
              >
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 group-hover:bg-gray-50 transition-colors duration-300 mb-4`}>
                    <IconComponent className={`text-2xl ${feature.color}`} />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-gray-800">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}


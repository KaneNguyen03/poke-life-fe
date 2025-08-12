import { reviews } from "@/constants"
import { useState } from "react"
import { useTranslation } from 'react-i18next'
import Slider from "react-slick"
import { FaStar, FaQuoteLeft, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa'
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"

const Reviews = () => {
  const { t } = useTranslation()
  const [showAll, setShowAll] = useState(false)

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar 
        key={index}
        className={`${index < rating ? 'text-yellow-400' : 'text-gray-300'} text-sm`}
      />
    ))
  }

  const ReviewCard = ({ review, isSlider = false }: { review: any, isSlider?: boolean }) => (
    <div className={`${isSlider ? 'mx-2' : ''}`}>
      <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 h-full border border-gray-100">
        {/* Quote Icon */}
        <div className="absolute top-4 right-4 text-green-100 group-hover:text-green-200 transition-colors duration-300">
          <FaQuoteLeft className="text-3xl" />
        </div>

        {/* Avatar & User Info */}
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mr-4">
            <FaUser className="text-white text-lg" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-lg">{review.name}</h4>
            <div className="flex items-center space-x-1 mt-1">
              {renderStars(review.rating)}
            </div>
          </div>
        </div>

        {/* Review Text */}
        <div className="relative">
          <p className="text-gray-700 leading-relaxed italic">
            "{review.comment}"
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl" />
      </div>
    </div>
  )

  return (
    <section id="reviews" className="py-20 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
              {t('reviews.title')}
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto mb-6" />
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('reviews.subtitle')}
          </p>
        </div>

        {/* Reviews Slider */}
        <div className="max-w-6xl mx-auto mb-12">
          <Slider {...settings}>
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} isSlider={true} />
            ))}
          </Slider>
        </div>

        {/* Show All Toggle */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="group inline-flex items-center bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {showAll ? (
              <>
                <FaEyeSlash className="mr-2 text-lg" />
                {t('reviews.hideAll')}
              </>
            ) : (
              <>
                <FaEye className="mr-2 text-lg" />
                {t('reviews.showAll')}
              </>
            )}
          </button>
        </div>

        {/* All Reviews Grid */}
        {showAll && (
          <div className="mt-12 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {reviews.map((review) => (
                <ReviewCard key={`grid-${review.id}`} review={review} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Custom Styles for Slider */}
      <style>{`
        .slick-dots {
          bottom: -60px;
        }
        .slick-dots li button:before {
          color: #10b981;
          font-size: 12px;
        }
        .slick-dots li.slick-active button:before {
          color: #059669;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </section>
  )
}

export default Reviews

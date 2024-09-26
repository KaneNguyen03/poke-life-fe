// components/ui/Reviews.tsx
import { reviews } from "@/constants"
import { useState } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"

const Reviews = () => {
  const [showAll, setShowAll] = useState(false)



  const settings = {
    dots: true,
    infinite: true,
    speed: 2400,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 500,
    cssEase: "ease-in-out",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <div className="reviews-section py-16 bg-green-50 rounded-lg shadow-lg">
      <h2 className="text-6xl font-bold text-center mb-24 text-green-600">Customer Reviews</h2>

      <div className="max-w-4xl mx-auto">
        <Slider {...settings}>
          {reviews.map((review) => (
            <div key={review.id} className="flex justify-center">
              <div
                className="flex-1 p-8 rounded-lg shadow-xl bg-white transition-transform transform hover:scale-105 hover:shadow-2xl m-2 min-h-52"
              >
                <div className="flex items-center mb-4">
                  <span className="mr-4 font-semibold text-lg">{review.name}</span>
                  <span className="text-yellow-500">{'⭐'.repeat(review.rating)}</span>
                </div>
                <p className="text-gray-800 text-lg flex-grow">{review.comment}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => setShowAll(!showAll)}
          className="bg-green-500 text-white py-3 px-6 rounded-lg text-xl transition hover:bg-green-600 shadow-lg"
        >
          {showAll ? "Hide All Reviews" : "Show All Reviews"}
        </button>
      </div>

      {showAll && (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="review flex flex-col p-8 border min-h-52 border-gray-300 rounded-lg shadow-xl bg-white transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="flex items-center mb-4">
                <span className="mr-4 font-semibold text-lg">{review.name}</span>
                <span className="text-yellow-500">{'⭐'.repeat(review.rating)}</span>
              </div>
              <p className="text-gray-800 text-lg flex-grow">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Reviews

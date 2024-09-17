import Hero from "@/layouts/layout-ui/Hero"
import About from "@/layouts/layout-ui/about"
import CustomDishes from "@/layouts/layout-ui/custom-dishes"
import Menu from "@/layouts/layout-ui/menu"
import { WorkoutSection } from "@/layouts/layout-ui/workout"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Menu />
      <CustomDishes />
      <section className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-red-500 p-4 rounded shadow-lg">
            <div className="flex flex-col justify-start mb-2">
              <h3 className="text-xl font-semibold text-black">Yummy</h3>
            </div>
            <div className="flex flex-col justify-end">
              <p className="text-md text-black">
                Tại MÂM, chúng tôi không chỉ chú trọng đến sức khỏe mà còn đảm bảo mỗi món ăn đều ngon miệng và hấp dẫn, khiến bạn thưởng thức một cách trọn vẹn nhất.
              </p>
            </div>
          </div>
          <div className="bg-red-500 p-4 rounded shadow-lg">
            <div className="flex flex-col justify-start mb-2">
              <h3 className="text-xl font-semibold text-white">Healthy</h3>
            </div>
            <div className="flex flex-col justify-end">
              <p className="text-md text-white">
                We are committed to using fresh ingredients, no preservatives and cooking in the eatclean style, bringing you nutritious and healthy meals.
              </p>
            </div>
          </div>
          <div className="bg-red-500 p-4 rounded shadow-lg">
            <div className="flex flex-col justify-start mb-2">
              <h3 className="text-xl font-semibold text-black">Balance</h3>
            </div>
            <div className="flex flex-col justify-end">
              <p className="text-md text-black">
                Each dish at MÂM is designed to provide all the necessary nutrients, helping you maintain a balanced and healthy lifestyle.
              </p>
            </div>
          </div>
          <div className="bg-red-500 p-4 rounded shadow-lg">
            <div className="flex flex-col justify-start mb-2">
              <h3 className="text-xl font-semibold text-white">Clean</h3>
            </div>
            <div className="flex flex-col justify-end">
              <p className="text-md text-white">
                We always put hygiene standards first, from choosing ingredients to processing, ensuring every meal is safe and pure.
              </p>
            </div>
          </div>
        </div>
      </section>
      <WorkoutSection />
    </div>
  )
}

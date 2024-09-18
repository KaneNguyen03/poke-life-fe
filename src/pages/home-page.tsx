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
      <WorkoutSection />
    </div>
  )
}

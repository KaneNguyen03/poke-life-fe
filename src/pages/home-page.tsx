import Blog from "@/components/ui/Blog"
import About from "@/components/ui/about"
// CustomDishes component preserved but hidden from UI
// import CustomDishes from "@/components/ui/custom-dishes"
import Hero from "@/components/ui/hero"
import { MenuSection } from "@/components/ui/menu-section"
import { WorkoutSection } from "@/components/ui/workout"
import { Element } from "react-scroll"

export default function HomePage() {
  return (
    <div className="min-h-screen pt-20">
      <Element name="hero" id="hero">
        <Hero />
      </Element>
      <Element name="about" id="about">
        <About />
      </Element>
      <Element name="menu" id="menu">
        <MenuSection />
      </Element>
      <Element name="blog" id="blog">
        <Blog />
      </Element>
      {/* <Element name="reviews" id="reviews">
        <Reviews />
      </Element> */}
      <Element name="workouts" id="workouts">
        <WorkoutSection />
      </Element>
    </div>
  )
}

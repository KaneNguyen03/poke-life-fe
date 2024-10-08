import Blog from "@/components/ui/Blog"
import About from "@/components/ui/about"
import CustomDishes from "@/components/ui/custom-dishes"
import Hero from "@/components/ui/hero"
import Menu from "@/components/ui/menu"
import Reviews from "@/components/ui/review"
import { WorkoutSection } from "@/components/ui/workout"
import { Element } from "react-scroll"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Element name="hero" id="hero">
        <Hero />
      </Element>
      <Element name="about" id="about">
        <About />
      </Element>
      <Element name="menu" id="menu">
        <Menu />
      </Element>
      <Element name="custom-dishes" id="custom-dishes">
        <CustomDishes />
      </Element>
      <Element name="blog" id="blog">
        <Blog />
      </Element>
      <Element name="reviews" id="reviews">
        <Reviews />
      </Element>
      <Element name="workouts" id="workouts">
        <WorkoutSection />
      </Element>
    </div>
  )
}

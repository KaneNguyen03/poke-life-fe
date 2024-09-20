import { Link } from "react-scroll"
import Background from "@/assets/background.jpg"

export default function Hero() {
    return (
        <section className="relative h-screen flex flex-col items-center justify-end overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src={Background}
                    alt="Healthy Food"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="relative z-10 text-center text-black mb-12"> {/* Added margin-bottom for spacing */}
                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition duration-300">
                    <Link to="about" smooth duration={500} className="text-gray-700 hover:text-gray-900">Get Started</Link>
                </button>
            </div>
        </section>
    )
}


import { Link } from "react-scroll"

export default function Footer() {
    return (
        <footer className="bg-green-100 text-black py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-1/4 mb-6 md:mb-0">
                        <h3 className="text-xl font-bold mb-4">
                            <img
                                decoding="async"
                                srcSet="https://framerusercontent.com/images/0wlkAl8VLrGKPjfVaKOnHICJSEE.png?scale-down-to=512 512w, https://framerusercontent.com/images/0wlkAl8VLrGKPjfVaKOnHICJSEE.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/0wlkAl8VLrGKPjfVaKOnHICJSEE.png 1961w"
                                src="https://framerusercontent.com/images/0wlkAl8VLrGKPjfVaKOnHICJSEE.png"
                                alt="Call to Action"
                                className="block w-44 object-cover rounded-full"
                                onClick={() => window.location.href = "/"}
                            />
                        </h3>
                        <p className="mr-12">Empowering you to live a healthier, happier life through clean eating and fitness.</p>
                    </div>
                    <div className="w-full md:w-1/4 mb-6 md:mb-0">
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-4">
                            <li><Link to="hero" smooth duration={500} className="text-gray-700 hover:text-gray-900">Home</Link></li>
                            <li><Link to="menu" smooth duration={500} className="text-gray-700 hover:text-gray-900">Menu</Link></li>
                            <li><Link to="about" smooth duration={500} className="text-gray-700 hover:text-gray-900">About</Link></li>
                            <li><Link to="custom-dishes" smooth duration={500} className="text-gray-700 hover:text-gray-900">Custom Dishes</Link></li>
                            <li><Link to="workouts" smooth duration={500} className="text-gray-700 hover:text-gray-900">Workouts</Link></li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/4 mb-6 md:mb-0">
                        <h4 className="text-lg font-semibold mb-4">Connect</h4>
                        <ul className="space-y-2">
                            <li><a href="https://www.facebook.com/profile.php?id=61566138359714&mibextid=JRoKGi" className="hover:text-green-300">Facebook</a></li>
                            <li><a href="#" className="hover:text-green-300">Instagram</a></li>
                            <li><a href="#" className="hover:text-green-300">Twitter</a></li>
                            <li><a href="#" className="hover:text-green-300">YouTube</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <p>&copy; 2024 Mam for eat clean food. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

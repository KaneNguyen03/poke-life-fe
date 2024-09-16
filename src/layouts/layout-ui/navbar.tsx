import { Link } from "react-router-dom"

export default function Navbar() {
    return (
        <nav className="">
            <div className="py-3 px-12">
                <div className="flex justify-between items-center">
                    <div className="text-lg font-semibold text-gray-700">
                        <img
                            decoding="async"
                            srcSet="https://framerusercontent.com/images/0wlkAl8VLrGKPjfVaKOnHICJSEE.png?scale-down-to=512 512w, https://framerusercontent.com/images/0wlkAl8VLrGKPjfVaKOnHICJSEE.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/0wlkAl8VLrGKPjfVaKOnHICJSEE.png 1961w"
                            src="https://framerusercontent.com/images/0wlkAl8VLrGKPjfVaKOnHICJSEE.png"
                            alt="Call to Action"
                            className="block w-32 object-cover rounded-full"
                        />
                    </div>
                    <div className="flex space-x-4">
                        <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
                        <Link to="/menu" className="text-gray-700 hover:text-gray-900">Menu</Link>
                        <Link to="/about" className="text-gray-700 hover:text-gray-900">About</Link>
                        <Link to="/contact" className="text-gray-700 hover:text-gray-900">Contact</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

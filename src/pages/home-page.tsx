import { Button } from "antd"

export default function HomePage() {
  return (
    <div className="bg-red-500 p-8 min-h-screen text-white">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Create Your Healthy Dish</h1>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">WELCOME TO MÂM</h2>
            <Button type="primary" size="large">Check our menu</Button>
          </div>
        </div>
      </header>

      <section className="mb-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center bg-white bg-opacity-10 p-4 rounded">
            <h3 className="text-xl font-semibold mb-2">Number of Dishes</h3>
            <p className="text-lg">10 Dishes</p>
          </div>
          <div className="text-center bg-white bg-opacity-10 p-4 rounded">
            <h3 className="text-xl font-semibold mb-2">Year of Experience</h3>
            <p className="text-lg">1+</p>
          </div>
        </div>
      </section>

      <section className="bg-black p-8 rounded mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start">
          <div className="mb-4 lg:mb-0 lg:mr-8">
            <h1 className="text-green-400 text-3xl font-bold">We're...</h1>
          </div>
          <div className="text-lg">
            <p className="mb-4">
              is MÂM, a passionate and creative startup group, with a mission to bring you healthy and delicious meals.
              MÂM is proud to introduce its unique product: <i className="text-green-400">the perfect combination of pokebowl, soumaki and eatclean</i>.
              We utilize the freshest ingredients, combined with special recipes to create dishes that are not only delicious but also good for your health.
              Click here to experience new flavors and the eatclean lifestyle today!
            </p>
            <div className="flex justify-end">
              <Button type="default" size="large">MORE ABOUT US</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">What We Have</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white bg-opacity-10 p-4 rounded">
            <img src="path/to/salmon-poke.jpg" alt="Salmon Poke Bowl" className="w-full h-32 object-cover rounded mb-2" />
            <h3 className="text-xl font-semibold">Salmon Poke Bowl</h3>
            <p className="text-lg">Calories: 450 kcal</p>
            <p className="text-md">Fresh salmon, avocado, cucumber, and rice</p>
          </div>
          <div className="bg-white bg-opacity-10 p-4 rounded">
            <img src="path/to/tofu-poke.jpg" alt="Tofu Poke Bowl" className="w-full h-32 object-cover rounded mb-2" />
            <h3 className="text-xl font-semibold">Tofu Poke Bowl</h3>
            <p className="text-lg">Calories: 400 kcal</p>
            <p className="text-md">Crispy tofu, edamame, carrots, and quinoa</p>
          </div>
          <div className="bg-white bg-opacity-10 p-4 rounded">
            <img src="path/to/tuna-poke.jpg" alt="Tuna Poke Bowl" className="w-full h-32 object-cover rounded mb-2" />
            <h3 className="text-xl font-semibold">Tuna Poke Bowl</h3>
            <p className="text-lg">Calories: 480 kcal</p>
            <p className="text-md">Ahi tuna, seaweed salad, mango, and rice</p>
          </div>
          <div className="bg-white bg-opacity-10 p-4 rounded">
            <img src="path/to/chicken-poke.jpg" alt="Chicken Poke Bowl" className="w-full h-32 object-cover rounded mb-2" />
            <h3 className="text-xl font-semibold">Chicken Poke Bowl</h3>
            <p className="text-lg">Calories: 420 kcal</p>
            <p className="text-md">Grilled chicken, corn, bell peppers, and brown rice</p>
          </div>
        </div>
      </section>

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
      <footer className="w-full bg-black text-white py-8">
        <div className="container mx-auto flex flex-col items-center">
          <div className="cta-button-inner relative">
            <div className="cta-button-img-wrapper relative rounded-full overflow-hidden">
              <img
                decoding="async"
                srcSet="https://framerusercontent.com/images/0wlkAl8VLrGKPjfVaKOnHICJSEE.png?scale-down-to=512 512w, https://framerusercontent.com/images/0wlkAl8VLrGKPjfVaKOnHICJSEE.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/0wlkAl8VLrGKPjfVaKOnHICJSEE.png 1961w"
                src="https://framerusercontent.com/images/0wlkAl8VLrGKPjfVaKOnHICJSEE.png"
                alt="Call to Action"
                className="block w-60 object-cover rounded-full"
              />
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-lg mb-2">
              <a className="text-orange-500 underline" href="mailto:mam.eatclean@gmail.com" target="_blank" rel="noopener">
                mam.eatclean@gmail.com
              </a>
            </p>
          </div>
        </div>
      </footer>

    </div>
  )
}

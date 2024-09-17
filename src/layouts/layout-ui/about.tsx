
export default function About() {
    return (
        <div className="bg-green-50 py-16">
      <div className="container mx-auto px-4">
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center bg-white bg-opacity-50 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-2 text-green-700">Number of Dishes</h3>
              <p className="text-3xl font-bold text-green-600">10 Dishes</p>
            </div>
            <div className="text-center bg-white bg-opacity-50 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-2 text-green-700">Year of Experience</h3>
              <p className="text-3xl font-bold text-green-600">1+</p>
            </div>
          </div>
        </section>

        <section className="bg-white p-8 rounded-lg shadow-lg mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start">
            <div className="mb-6 lg:mb-0 lg:mr-8">
              <h1 className="text-green-600 text-4xl font-bold">We're...</h1>
            </div>
            <div className="text-lg text-gray-700">
              <p className="mb-6">
                MÂM, a passionate and creative startup group, with a mission to bring you healthy and delicious meals.
                We're proud to introduce our unique product: <i className="text-green-600 font-semibold">the perfect combination of pokebowl, soumaki and eatclean</i>.
                We utilize the freshest ingredients, combined with special recipes to create dishes that are not only delicious but also good for your health.
              </p>
              <div className="flex justify-end">
                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition duration-300">
                  MORE ABOUT US
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    )
}


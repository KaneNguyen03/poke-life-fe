import { useTranslation } from 'react-i18next'
import { FaPlay, FaClock, FaFire, FaVideo, FaExternalLinkAlt } from 'react-icons/fa'

const workouts = [
    {
        id: 1,
        titleKey: "workouts.yoga.title",
        descriptionKey: "workouts.yoga.description",
        imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        url: "https://www.youtube.com/watch?v=v7AYKMP6rOE",
        duration: 20,
        difficulty: "beginner",
        calories: 150,
        type: "yoga"
    },
    {
        id: 2,
        titleKey: "workouts.hiit.title",
        descriptionKey: "workouts.hiit.description",
        imageUrl: "https://images.unsplash.com/photo-1434596922112-19c563067271?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        url: "https://www.youtube.com/watch?v=ml6cT4AZdqI",
        duration: 30,
        difficulty: "intermediate",
        calories: 400,
        type: "cardio"
    },
    {
        id: 3,
        titleKey: "workouts.strength.title",
        descriptionKey: "workouts.strength.description",
        imageUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
        url: "https://www.youtube.com/watch?v=0hYDDsRjwks",
        duration: 45,
        difficulty: "advanced",
        calories: 350,
        type: "strength"
    },
]

export const WorkoutSection = () => {
    const { t } = useTranslation()

    const getDifficultyColor = (difficulty: string) => {
        const colors = {
            beginner: 'bg-green-100 text-green-800',
            intermediate: 'bg-yellow-100 text-yellow-800',
            advanced: 'bg-red-100 text-red-800'
        }
        return colors[difficulty as keyof typeof colors] || 'bg-gray-100 text-gray-800'
    }

    const getTypeIcon = (type: string) => {
        const icons = {
            yoga: '🧘‍♀️',
            cardio: '🏃‍♂️',
            strength: '💪'
        }
        return icons[type as keyof typeof icons] || '🏃‍♂️'
    }

    return (
        <section id="workouts" className="py-20 bg-gradient-to-b from-white to-green-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
                            {t('workouts.title')}
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto mb-6" />
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        {t('workouts.subtitle')}
                    </p>
                </div>

                {/* Workout Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {workouts.map((workout) => (
                        <div 
                            key={workout.id}
                            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
                        >
                            {/* Workout Image & Play Button */}
                            <div className="relative overflow-hidden">
                                <img 
                                    src={workout.imageUrl} 
                                    alt={t(workout.titleKey)} 
                                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                                    loading="lazy"
                                />
                                
                                {/* Dark Overlay */}
                                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300" />
                                
                                {/* Play Button */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                        <FaPlay className="text-green-600 text-xl ml-1" />
                                    </div>
                                </div>

                                {/* Workout Type Badge */}
                                <div className="absolute top-4 left-4">
                                    <div className="bg-white bg-opacity-90 rounded-full px-3 py-1 flex items-center">
                                        <span className="text-lg mr-1">{getTypeIcon(workout.type)}</span>
                                        <span className="text-sm font-semibold text-gray-800">
                                            {t(`workouts.types.${workout.type}`)}
                                        </span>
                                    </div>
                                </div>

                                {/* Difficulty Badge */}
                                <div className="absolute top-4 right-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(workout.difficulty)}`}>
                                        {t(`workouts.difficulty.${workout.difficulty}`)}
                                    </span>
                                </div>
                            </div>

                            {/* Workout Content */}
                            <div className="p-6">
                                {/* Title */}
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300">
                                    {t(workout.titleKey)}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    {t(workout.descriptionKey)}
                                </p>

                                {/* Workout Stats */}
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    <div className="text-center">
                                        <FaClock className="text-green-600 mx-auto mb-1" />
                                        <p className="text-xs text-gray-500 uppercase tracking-wide">Duration</p>
                                        <p className="font-semibold text-gray-900">{workout.duration}min</p>
                                    </div>
                                    <div className="text-center">
                                        <FaFire className="text-orange-500 mx-auto mb-1" />
                                        <p className="text-xs text-gray-500 uppercase tracking-wide">Calories</p>
                                        <p className="font-semibold text-gray-900">{workout.calories}</p>
                                    </div>
                                    <div className="text-center">
                                        <FaVideo className="text-blue-600 mx-auto mb-1" />
                                        <p className="text-xs text-gray-500 uppercase tracking-wide">Type</p>
                                        <p className="font-semibold text-gray-900">{t(`workouts.types.${workout.type}`)}</p>
                                    </div>
                                </div>

                                {/* Watch Button */}
                                <a
                                    href={workout.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group/btn w-full inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                >
                                    <FaPlay className="mr-2 text-sm" />
                                    <span className="mr-2">{t('workouts.watchVideo')}</span>
                                    <FaExternalLinkAlt className="text-xs opacity-75 group-hover/btn:opacity-100 transition-opacity duration-300" />
                                </a>
                            </div>

                            {/* Hover Effect Border */}
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                        </div>
                    ))}
                </div>


            </div>
        </section>
    )
}

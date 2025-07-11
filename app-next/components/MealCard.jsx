export default function MealCard({ meal }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-sm">
      {/* Meal Image */}
      <img
        src={meal.image_url || "https://source.unsplash.com/400x300/?food"}
        alt={meal.title}
        className="w-full h-48 object-cover"
      />

      {/* Meal Details */}
      <div className="p-4">
        <h2 className="text-lg font-bold">{meal.title}</h2>
        <p className="text-sm text-gray-600 mb-2">{meal.description}</p>
        <p className="text-sm">
          📍 <strong>{meal.location}</strong>
        </p>
        <p className="text-sm">
          💵 <strong>${meal.price}</strong>
        </p>
      </div>
    </div>
  );
}

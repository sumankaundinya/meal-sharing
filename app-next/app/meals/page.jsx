import MealList from "@/components/MealList/MealList";

export default function AllMealsPage() {
  return (
    <div
      style={{
        padding: "2rem",
        minHeight: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1606787366850-de6330128bfc')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 style={{ color: "#fff", textShadow: "2px 2px 8px #000" }}>
        All Meals
      </h1>
      <MealList />
    </div>
  );
}

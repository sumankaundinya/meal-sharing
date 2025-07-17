import MealList from "@/components/MealList/MealList";
import styles from "./page.module.css";

export default function AllMealsPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Meals</h1>
      <MealList />
    </div>
  );
}

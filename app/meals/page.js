import MealsGrid from "@/components/Meals/meals-grid";
import classes from "./page.module.css";
import loadingClasses from "./loading.module.css";
import Link from "next/link";
import { getMeals } from "@/lib/meals";
import { Suspense } from "react";

const Meals = async () => {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
};

const MealsPage = async () => {
  return (
    <>
      <header className={classes.header}>
        <h1>Delicious meals, created</h1>
        <span className={classes.highlight}>by you</span>
        <p>
          Choose your favorite recipe and cook it yourself. it is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/shared">Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense
          fallback={
            <div className={loadingClasses.loading}>Fetching the page</div>
          }
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
};

export default MealsPage;

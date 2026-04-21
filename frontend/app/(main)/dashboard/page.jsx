import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  Globe,
  ArrowRight,
  Flame,
  Sparkles,
  ChefHat,
  Search,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  getRecipeOfTheDay,
  getCategories,
  getAreas,
} from "@/actions/mealdb.actions";

import { getCategoryEmoji, getCountryFlag } from "@/lib/data";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  // same logic
  const recipeData = await getRecipeOfTheDay();
  const categoriesData = await getCategories();
  const areasData = await getAreas();

  const recipeOfTheDay = recipeData?.recipe;
  const categories = categoriesData?.categories || [];
  const areas = areasData?.areas || [];

  return (
    <div className="min-h-screen bg-linear-to-b from-stone-50 via-white to-orange-50/40">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:px-8">

        {/* HERO */}
        <div className="mb-5">
          <h1 className="text-5xl md:text-7xl font-bold text-stone-900 mb-4 tracking-tight leading-tight">
            Daily Dishes, Made Easy 👨‍🍳
          </h1>
          <p className="text-xl text-stone-600 font-light max-w-2xl">
            Explore simple, flavorful recipes from around the world. Cook with
            confidence, save time, and enjoy every meal you create.
          </p>
        </div>

        {/* RECIPE OF THE DAY */}
        {recipeOfTheDay && (
          <section className="mt-14">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-orange-100 p-2">
                <Flame className="h-5 w-5 text-orange-600" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-stone-900 md:text-3xl">
                  Recipe of the Day
                </h2>
                <p className="text-sm text-stone-500">
                  Handpicked inspiration for today
                </p>
              </div>
            </div>

            <Link
              href={`/recipe?cook=${encodeURIComponent(
                recipeOfTheDay.strMeal
              )}`}
            >
              <div className="group overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="grid lg:grid-cols-2">
                  {/* image */}
                  <div className="relative min-h-80 overflow-hidden">
                    <Image
                      src={recipeOfTheDay.strMealThumb}
                      alt={recipeOfTheDay.strMeal}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute left-4 top-4">
                      <Badge className="rounded-full bg-white/90 text-stone-900 backdrop-blur">
                        <Flame className="mr-1 h-3 w-3 text-orange-600" />
                        Today’s Pick
                      </Badge>
                    </div>
                  </div>

                  {/* content */}
                  <div className="flex flex-col justify-center p-7 md:p-10">
                    <div className="mb-4 flex flex-wrap gap-2">
                      <Badge
                        variant="outline"
                        className="rounded-full border-orange-200 bg-orange-50 text-orange-700"
                      >
                        {recipeOfTheDay.strCategory}
                      </Badge>

                      <Badge
                        variant="outline"
                        className="rounded-full border-stone-200"
                      >
                        <Globe className="mr-1 h-3 w-3" />
                        {recipeOfTheDay.strArea}
                      </Badge>
                    </div>

                    <h3 className="text-3xl font-bold leading-tight text-stone-900 md:text-5xl">
                      {recipeOfTheDay.strMeal}
                    </h3>

                    <p className="mt-4 line-clamp-4 text-stone-600">
                      {recipeOfTheDay.strInstructions?.substring(0, 220)}...
                    </p>

                    {recipeOfTheDay.strTags && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {recipeOfTheDay.strTags
                          .split(",")
                          .slice(0, 4)
                          .map((tag, i) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="rounded-full bg-stone-100 text-stone-600"
                            >
                              {tag.trim()}
                            </Badge>
                          ))}
                      </div>
                    )}

                    <div className="mt-8">
                      <Button className="h-11 rounded-xl bg-orange-600 px-5 text-white hover:bg-orange-700">
                        Start Cooking
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* CATEGORIES */}
        <section className="mt-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-stone-900 md:text-3xl">
                Browse Categories
              </h2>
              <p className="text-sm text-stone-500">
                Find recipes by cravings and mood
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
            {categories.map((category) => (
              <Link
                key={category.strCategory}
                href={`/recipes/category/${category.strCategory.toLowerCase()}`}
              >
                <div className="group rounded-2xl border border-stone-200 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg">
                  <div className="mb-3 text-4xl">
                    {getCategoryEmoji(category.strCategory)}
                  </div>

                  <p className="text-sm font-semibold text-stone-800 group-hover:text-orange-600">
                    {category.strCategory}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CUISINES */}
        <section className="mt-16 pb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-stone-900 md:text-3xl">
              Explore World Cuisines
            </h2>

            <p className="text-sm text-stone-500">
              Discover flavors from every corner of the globe
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {areas.map((area, index) => {
              const cuisineTexts = [
                "Rich culinary traditions",
                "Signature local flavors",
                "Classic comfort favorites",
                "Bold and vibrant tastes",
                "Beloved regional recipes",
                "Fresh everyday dishes",
                "Traditional kitchen classics",
                "Iconic national favorites",
                "Flavorful heritage meals",
                "Timeless home cooking",
              ];

              return (
                <Link
                  key={area.strArea}
                  href={`/recipes/cuisine/${area.strArea
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  <div className="group flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-stone-100 text-2xl">
                      {getCountryFlag(area.strArea)}
                    </div>

                    <div>
                      <p className="font-semibold text-stone-900 group-hover:text-orange-600">
                        {area.strArea}
                      </p>

                      <p className="text-xs text-stone-500">
                        {cuisineTexts[index % cuisineTexts.length]}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
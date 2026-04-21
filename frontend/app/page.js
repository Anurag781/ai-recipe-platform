"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Star, Flame, Clock, Users } from "lucide-react";
import Image from "next/image";
import { SignUpButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SITE_STATS, FEATURES, HOW_IT_WORKS_STEPS } from "@/lib/data";
import PricingSection from "@/components/PricingSection";
import Link from "next/link";

export default function LandingPage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    // if (isLoaded && isSignedIn) {
    //   router.push("/dashboard");
    // }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) return null;

  const subscriptionTier = "free";

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-stone-900 selection:bg-orange-100">

      {/* Hero Section */}
      <section className="pt-25 pb-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

            {/* Text Content */}
            <div className="flex-[1.2] text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-600 text-xs font-bold mb-8 uppercase tracking-[0.2em] animate-fade-in">
                <Flame className="w-3 h-3 text-orange-600 fill-orange-600" />
                The Future of Fine Dining at Home
              </div>

              <h1 className="text-6xl md:text-[5.5rem] font-bold mb-8 leading-[0.9] tracking-tighter text-stone-900">
                Master your <br />
                <span className="italic font-serif text-orange-600">inventory.</span> <br />
                Elevate your plate.
              </h1>

              <p className="text-lg md:text-xl text-stone-500 mb-10 max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed">
                Your ingredients, <span className="text-stone-900 font-semibold tracking-tight">elevated.</span>
                <span className="block mt-1">
                  Just snap a photo of your fridge and let our AI transform your groceries into
                  <span className="italic font-serif text-orange-600"> chef-caliber </span>
                  recipes in seconds.
                </span>
              </p>

              <div className="flex flex-col items-start gap-6">
                <Link href="/dashboard">
                  <Button
                    size="xl"
                    className="px-10 py-8 text-lg rounded-full bg-stone-900 hover:bg-orange-600 text-white transition-all duration-300 shadow-xl hover:shadow-orange-200/50"
                  >
                    Start Cooking Free <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>

                {/* This section now sits directly below the button */}
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">
                    <span className="text-stone-900">10k+ cooks</span> joined last month
                  </p>
                </div>
              </div>

            </div>

            {/* Hero Image - Premium Multi-Layer Gallery */}
            <div className="flex-1 w-full relative flex items-center justify-center min-h-[600px] lg:min-h-[700px]">

              {/* background glow */}
              <div className="absolute top-20 right-16 h-60 w-60 rounded-full bg-orange-200/30 blur-3xl" />
              <div className="absolute bottom-16 left-16 h-52 w-52 rounded-full bg-amber-100/40 blur-3xl" />

              {/* FAR LEFT - Increased z-index and pulled further left */}
              <div className="absolute top-32 left-[-20px] md:left-[-40px] w-[180px] md:w-[220px] rounded-[2rem] overflow-hidden border-8 border-white shadow-xl rotate-[-20deg] z-20 opacity-90">
                <Image
                  src="/dessert.jfif"
                  alt="Dessert"
                  width={400}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* LEFT - Lower z-index so it sits behind the far-left */}
              <div className="absolute top-20 left-10 md:left-20 w-[200px] md:w-[240px] rounded-[2rem] overflow-hidden border-8 border-white shadow-xl rotate-[-12deg] z-10">
                <Image
                  src="/salad.jfif"
                  alt="Salad"
                  width={420}
                  height={520}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* RIGHT - Lower z-index */}
              <div className="absolute top-10 right-10 md:right-20 w-[210px] md:w-[250px] rounded-[2rem] overflow-hidden border-8 border-white shadow-xl rotate-[12deg] z-10">
                <Image
                  src="/burger.jpg"
                  alt="Burger"
                  width={440}
                  height={540}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* FAR RIGHT - Increased z-index and pulled further right */}
              <div className="absolute top-36 right-[-20px] md:right-[-40px] w-[180px] md:w-[220px] rounded-[2rem] overflow-hidden border-8 border-white shadow-xl rotate-[20deg] z-20 opacity-90">
                <Image
                  src="/pizza.jfif"
                  alt="Pizza"
                  width={400}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* MAIN FRONT CARD - Stays on top */}
              <div className="relative z-30 w-[300px] md:w-[420px] lg:w-[480px] rounded-[2.5rem] overflow-hidden border-8 border-white shadow-[0_50px_120px_-20px_rgba(0,0,0,0.25)] rotate-3 hover:rotate-0 transition-all duration-700">
                <Image
                  src="/pasta-dish.png"
                  alt="Premium Dish"
                  width={650}
                  height={780}
                  className="w-full h-full object-cover scale-105"
                />

                {/* overlay and content */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 bg-white/85 backdrop-blur-xl border border-white/40 p-5 rounded-2xl shadow-2xl">
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div>
                      <h3 className="font-bold text-lg md:text-xl tracking-tight text-stone-900 leading-tight">
                        Wild Mushroom & Truffle Tagliatelle
                      </h3>
                      <div className="flex gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                        ))}
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-green-500 text-white text-[10px] font-black rounded-full tracking-widest uppercase whitespace-nowrap">
                      98% Match
                    </div>
                  </div>
                  <div className="flex gap-6 text-[10px] text-stone-500 font-bold uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> 25 mins</span>
                    <span className="flex items-center gap-1.5"><Users className="w-3 h-3" /> 2 servings</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Optimized Premium Compact Stats Section */}
      <section className="relative py-14 bg-[#0b0b0b] overflow-hidden">
        {/* Lightweight Ambient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.08),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.02),transparent_34%)]" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {SITE_STATS.map((stat, i) => (
              <div
                key={i}
                className="group relative rounded-2xl border border-white/8 bg-white/[0.025] px-5 py-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/35"
              >
                {/* Minimal Accent Line */}
                <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/70 to-transparent" />

                {/* Value */}
                <div className="text-3xl md:text-4xl font-black text-white tracking-tight leading-none mb-2">
                  {stat.val}
                </div>

                {/* Label */}
                <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.28em] text-stone-400 group-hover:text-orange-400 transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Refined Premium Grid */}
      <section className="py-20 md:py-24 px-5 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12 md:mb-14 text-center md:text-left px-1">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-stone-900 mb-4 leading-none">
              Your Smart Kitchen Assistant.
            </h2>

            <p className="text-base md:text-xl text-stone-500 font-medium max-w-2xl md:max-w-none mx-auto md:mx-0 leading-relaxed">
              Powerful tools that help you cook better, save time, and create restaurant-quality meals at home.
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 px-1 sm:px-2 md:px-3">
            {FEATURES.map((feature, index) => {
              const IconComponent = feature.icon;

              return (
                <Card
                  key={index}
                  className="group relative overflow-hidden rounded-3xl border border-stone-200/70 bg-white shadow-sm hover:shadow-[0_22px_45px_-18px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-500"
                >
                  {/* Accent */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/70 to-transparent" />
                  <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-orange-100 blur-3xl opacity-70 group-hover:scale-125 transition-transform duration-500" />

                  <CardContent className="relative p-5 sm:p-6 md:p-7">
                    {/* Top Row */}
                    <div className="flex justify-between items-start mb-5">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-800 group-hover:bg-stone-900 group-hover:text-white transition-all duration-500">
                        <IconComponent className="w-5 h-5" />
                      </div>

                      <Badge className="rounded-full bg-orange-100 text-orange-700 border-none font-bold text-[10px] px-3 py-1 tracking-wide">
                        {feature.limit}
                      </Badge>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-stone-900 mb-3">
                      {feature.title}
                    </h3>

                    <p className="text-sm sm:text-base text-stone-500 leading-relaxed font-medium">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works - Recruiter Ready Premium Section */}
      <section className="py-18 md:py-22 px-5 sm:px-6 lg:px-8 bg-stone-950 text-white">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-10 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-none">
              Cook in 3 Simple Steps
            </h2>

            <p className="mt-3 text-sm sm:text-base md:text-lg text-stone-400 max-w-2xl leading-relaxed">
              A streamlined experience designed to help users discover recipes, cook faster, and enjoy better meals.
            </p>
          </div>

          {/* Steps */}
          <div className="grid">
            {HOW_IT_WORKS_STEPS.map((item, i) => {
              const subHeadings = [
                "Point camera at the fridge. AI instantly identifies ingredients.",
                "Choose a personalized recipe based on your mood and pantry.",
                "Follow simple guided steps and enjoy delicious homemade food.",
              ];

              return (
                <div
                  key={i}
                  className="flex flex-col md:flex-row gap-4 md:gap-6 items-start border-t border-stone-700 py-6 md:py-7"
                >
                  {/* Number */}
                  <span className="text-3xl sm:text-4xl md:text-5xl font-black text-orange-500 leading-none min-w-[62px] md:min-w-[78px]">
                    {item.step}
                  </span>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-white mb-2">
                      {item.title}
                    </h3>

                    {/* Subheading */}
                    <p className="text-sm md:text-base text-stone-300 leading-relaxed mb-2 max-w-2xl">
                      {subHeadings[i]}
                    </p>

                    {/* Description */}
                    <p className="text-sm md:text-base text-stone-500 leading-relaxed max-w-2xl">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Bottom Divider */}
            <div className="border-t border-stone-700"></div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <div className="pt-20 md:pt-24 pb-20 md:pb-24 px-5 sm:px-6 lg:px-8">
        <PricingSection />
      </div>

    </div>
  );
}
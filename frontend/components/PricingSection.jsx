import React from "react";
import { Check } from "lucide-react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { PricingTable } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function PricingSection({ subscriptionTier = "free" }) {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-14 text-center md:text-left">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 mb-4">
          Simple Pricing
        </h2>

        <p className="text-base md:text-lg text-stone-500 max-w-2xl leading-relaxed">
          Start free today and upgrade when you&apos;re ready to cook smarter,
          faster, and better.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
        {/* Free Plan */}
        <Card className="group relative border border-stone-200 bg-white rounded-3xl shadow-sm hover:shadow-[0_24px_50px_-18px_rgba(0,0,0,0.10)] transition-all duration-500 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-stone-300 to-transparent" />

          <CardHeader className="pb-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-stone-900">
              Sous Chef
            </CardTitle>

            <div className="text-4xl md:text-5xl font-bold text-stone-900">
              $0
              <span className="text-base font-medium text-stone-400">/mo</span>
            </div>

            <CardDescription className="text-stone-500 text-sm md:text-base leading-relaxed">
              Perfect for casual weekly cooks.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ul className="space-y-4">
              {[
                "10 pantry scans per month",
                "5 AI meal recommendations",
                "Standard support",
                "Standard Recipes",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-stone-700 text-sm md:text-base"
                >
                  <Check className="h-5 w-5 shrink-0 mt-0.5 text-stone-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>

          <CardFooter className="mt-auto pt-6">
            <Link href="/dashboard" className="w-full">
              <Button
                variant="outline"
                className="w-full h-11 rounded-xl border border-stone-900 hover:bg-stone-900 hover:text-white font-semibold"
              >
                Get Started
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Pro Plan */}
        <Card className="group relative border border-orange-300 bg-linear-to-b from-orange-50 to-white rounded-3xl shadow-sm hover:shadow-[0_28px_60px_-20px_rgba(249,115,22,0.22)] transition-all duration-500 overflow-hidden">

          {/* Responsive Badge */}
          <Badge className="absolute top-3 right-3 sm:top-4 sm:right-4 rounded-full bg-orange-600 text-white font-semibold text-[9px] sm:text-[10px] px-2.5 sm:px-3 py-1 uppercase tracking-[0.14em] sm:tracking-[0.18em] border-none max-w-fit whitespace-nowrap">
            Most Popular
          </Badge>

          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-orange-500 to-transparent" />

          <CardHeader className="pb-6 pr-24 sm:pr-28">
            <CardTitle className="text-2xl md:text-3xl font-bold text-orange-950">
              Head Chef
            </CardTitle>

            <div className="text-4xl md:text-5xl font-bold text-orange-600">
              $7.99
              <span className="text-base font-medium text-orange-400">/mo</span>
            </div>

            <CardDescription className="text-orange-900/70 text-sm md:text-base leading-relaxed">
              For the serious home cook.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ul className="space-y-4">
              {[
                "Unlimited pantry scans",
                "Unlimited AI recipes",
                "Priority Support",
                "Recipes with Nutritional analysis",
                "Chef's Tips & Tricks",
                "Ingredient Substitutions",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-stone-800 text-sm md:text-base"
                >
                  <Badge className="bg-orange-100 p-1 rounded-full h-6 w-6 flex items-center justify-center border-none shrink-0">
                    <Check className="h-4 w-4 text-orange-600" />
                  </Badge>

                  <span className="font-medium leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>

          <CardFooter className="pt-6">
            <SignedIn>
              <PricingTable
                planId="cplan_3C40g081RlIXqrdi1R5tKDdTcoV"
                planPeriod="month"
                newSubscriptionRedirectUrl="/dashboard"
                checkoutProps={{
                  appearance: {
                    elements: {
                      drawerRoot: {
                        zIndex: 2000,
                      },
                    },
                  },
                }}
              >
                <Button
                  disabled={subscriptionTier === "pro"}
                  className="w-full h-11 rounded-xl bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 disabled:cursor-not-allowed text-white font-semibold"
                >
                  {subscriptionTier === "pro"
                    ? "Subscribed"
                    : "Subscribe Now"}
                </Button>
              </PricingTable>
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="primary" className="w-full h-11 rounded-xl">
                  Login to Subscribe
                </Button>
              </SignInButton>
            </SignedOut>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}